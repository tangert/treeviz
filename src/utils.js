// Stores the POS tags for word components
export const POS_TAGS = [
  "CC", "CD", "DT", "EX", "FW", "IN",
  "JJ", "JJR", "JJS", "LS", "MD", "NN",
  "NNS", "NNP", "NNPS", "PDT", "POS", "PRP",
  "PRP$", "RB", "RBR", "RBS", "RP", "SYM",
  "TO", "UH", "VB", "VBD", "VBG", "VBN",
  "VBP", "VBZ", "WDT", "WP", "WP$", "WRB"
];

// Stores other tags for word components
export const LEMMA_TAGS = [
  "CC", "CD", "DT", "EX", "FW", "IN",
  "JJ", "JJR", "JJS", "LS", "MD", "NN",
  "NNS", "NNP", "NNPS", "PDT", "POS", "PRP",
  "PRP$", "RB", "RBR", "RBS", "RP", "SYM",
  "TO", "UH", "VB", "VBD", "VBG", "VBN",
  "VBP", "VBZ", "WDT", "WP", "WP$", "WRB"
];


// MARK: Prototype extensions
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
