import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MENU_ITEMS,
  GALLERY_ITEMS,
  TESTIMONIALS,
  validateEmail,
  validateReservation,
  getNextSlideIndex
} from './cafeData';

test('menu items integrity', () => {
  assert.equal(MENU_ITEMS.length, 6, 'Menu must contain exactly 6 curated items');
  const expectedNames = [
    'Classic Caffè Latte',
    'Fresh Brewed Coffee',
    'Iced Cold Brew',
    'Matcha Latte',
    'Butter Croissant',
    'Lemon Cake Slice'
  ];
  for (const name of expectedNames) {
    const found = MENU_ITEMS.some((item) => item.name === name);
    assert.ok(found, `Expected menu item ${name} to be present`);
  }
});

test('gallery items integrity', () => {
  assert.equal(GALLERY_ITEMS.length, 8, 'Gallery must contain exactly 8 items');
  for (let i = 1; i <= 8; i++) {
    const found = GALLERY_ITEMS.some((item) => item.src === `images/gallery-${i}.jpg`);
    assert.ok(found, `Expected gallery image gallery-${i}.jpg to exist`);
  }
});

test('testimonials count', () => {
  assert.equal(TESTIMONIALS.length, 3, 'Testimonials slider must contain exactly 3 quotes');
});

test('validateEmail checks standard email patterns', () => {
  assert.equal(validateEmail('claire@example.com'), true);
  assert.equal(validateEmail('hello+test@domain.org'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail(''), false);
  assert.equal(validateEmail('missing@dot'), false);
});

test('validateReservation requires valid name, date, time, and guest count', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const validRes = validateReservation({
    name: 'Eleanor Roosevelt',
    date: tomorrowStr,
    time: '10:30 AM',
    guests: 2
  });
  assert.equal(validRes.valid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);

  const invalidRes = validateReservation({
    name: 'A', // too short
    date: '2020-01-01', // past date
    time: '',
    guests: 0 // invalid guest count
  });
  assert.equal(invalidRes.valid, false);
  assert.ok(invalidRes.errors.name);
  assert.ok(invalidRes.errors.date);
  assert.ok(invalidRes.errors.time);
  assert.ok(invalidRes.errors.guests);
});

test('getNextSlideIndex wraps correctly forwards and backwards', () => {
  assert.equal(getNextSlideIndex(0, 3, 'next'), 1);
  assert.equal(getNextSlideIndex(1, 3, 'next'), 2);
  assert.equal(getNextSlideIndex(2, 3, 'next'), 0); // loop back
  assert.equal(getNextSlideIndex(0, 3, 'prev'), 2); // loop back
  assert.equal(getNextSlideIndex(2, 3, 'prev'), 1);
});
