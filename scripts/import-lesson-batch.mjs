#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const WORDS_PATH = path.join(ROOT, 'public/data/words-ru-hy.json');
const LESSON_PATH = path.join(ROOT, 'docs/current-lesson.txt');

function parseArgs(argv) {
  const args = {
    input: null,
    dryRun: false,
    lessonSize: 5,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === '--dry-run') {
      args.dryRun = true;
      continue;
    }

    if (token === '--input' || token === '-i') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('Expected a file path after --input/-i');
      }
      args.input = value;
      i += 1;
      continue;
    }

    if (token === '--lesson-size' || token === '--size' || token === '-s') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('Expected a positive integer after --lesson-size/--size/-s');
      }

      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed < 1) {
        throw new Error(`Invalid lesson size: "${value}". Expected a positive integer.`);
      }

      args.lessonSize = parsed;
      i += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  return args;
}

function readBatchText(inputPath) {
  if (inputPath) {
    return fs.readFileSync(path.resolve(ROOT, inputPath), 'utf8');
  }

  if (process.stdin.isTTY) {
    throw new Error(
      'No batch input provided. Use --input <file> or pipe text via stdin.',
    );
  }

  return fs.readFileSync(0, 'utf8');
}

function normalizeValue(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function normalizeTranslation(translation) {
  let result = translation.trim().toLowerCase();

  // Turn numbered lists ("1. ..., 2. ...") into comma-separated variants.
  result = result.replace(/\s*\b\d+\.\s*/g, ', ');
  result = result.replace(/\s*=\s*/g, ' = ');
  result = result.replace(/\s+/g, ' ');
  result = result.replace(/\s*,\s*/g, ', ');
  result = result.replace(/(,\s*){2,}/g, ', ');
  result = result.replace(/^,\s*/, '').replace(/\s*,\s*$/, '');

  return result;
}

function parseBatch(text) {
  const lines = text.split(/\r?\n/);
  const parsed = [];
  const seen = new Set();

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || /^[=-]+$/.test(line)) {
      continue;
    }

    const dividerIndex = line.indexOf('-');
    if (dividerIndex === -1) {
      throw new Error(`Malformed line, expected "value - translation": ${line}`);
    }

    const rawValue = line.slice(0, dividerIndex).trim();
    const rawTranslation = line.slice(dividerIndex + 1).trim();

    if (!rawValue || !rawTranslation) {
      throw new Error(`Incomplete line, both parts are required: ${line}`);
    }

    const value = normalizeValue(rawValue);
    const translation = normalizeTranslation(rawTranslation);
    const key = value;

    if (!seen.has(key)) {
      seen.add(key);
      parsed.push({ value, translation });
    }
  }

  return parsed;
}

function readCurrentLessonNumber() {
  const raw = fs.readFileSync(LESSON_PATH, 'utf8').trim();
  const number = Number.parseInt(raw, 10);
  if (!Number.isFinite(number) || number < 1) {
    throw new Error(`Invalid lesson number in ${LESSON_PATH}: "${raw}"`);
  }

  return number;
}

function getLessonTag(lessonNumber, lessonSize) {
  const lessonStart = lessonNumber - ((lessonNumber - 1) % lessonSize);
  const lessonEnd = lessonStart + lessonSize - 1;
  return `Уроки ${lessonStart}-${lessonEnd}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const batchText = readBatchText(args.input);
  const parsedBatch = parseBatch(batchText);

  const words = JSON.parse(fs.readFileSync(WORDS_PATH, 'utf8'));
  const wordsByValue = new Map(
    words.map((entry) => [normalizeValue(String(entry.value ?? '')), entry]),
  );

  const lessonStart = readCurrentLessonNumber();
  const nextLesson = lessonStart + 1;
  const lessonTag = getLessonTag(lessonStart, args.lessonSize);

  const toInsert = [];
  const taggedExisting = [];

  for (const item of parsedBatch) {
    const existingWord = wordsByValue.get(item.value);
    if (existingWord) {
      existingWord.tags = existingWord.tags.filter((tag) => {
        const match = /^Уроки (\d+)-(\d+)$/.exec(tag);
        if (!match || tag === lessonTag) {
          return true;
        }

        const tagStart = Number.parseInt(match[1], 10);
        const tagEnd = Number.parseInt(match[2], 10);
        return lessonStart < tagStart || lessonStart > tagEnd;
      });
      if (!existingWord.tags.includes(lessonTag)) {
        existingWord.tags.push(lessonTag);
        taggedExisting.push(item.value);
      }
      continue;
    }

    toInsert.push({
      value: item.value,
      translation: item.translation,
      tags: [lessonTag],
    });
  }

  if (!args.dryRun) {
    const updated = [...words, ...toInsert];
    fs.writeFileSync(WORDS_PATH, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
    fs.writeFileSync(LESSON_PATH, `${nextLesson}\n`, 'utf8');
  }

  console.log(`Tag: ${lessonTag}`);
  console.log(`Parsed: ${parsedBatch.length}`);
  console.log(`Added: ${toInsert.length}`);
  console.log(`Tagged existing: ${taggedExisting.length}`);
  if (taggedExisting.length > 0) {
    console.log(`Tagged existing words: ${taggedExisting.join(', ')}`);
  }
  console.log(`Next lesson number: ${nextLesson}`);
}

main();
