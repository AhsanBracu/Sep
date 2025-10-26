function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ ${message} — Expected: ${expected}, Got: ${actual}`);
    process.exit(1);
  }
  console.log(`✅ ${message}`);
}

module.exports = { assertEqual };
