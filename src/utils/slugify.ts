/** Makes a slug out of a string
 * @see https://gist.github.com/mathewbyrne/1280286
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[æ]/g, "ae") // Replace special chars
    .replace(/[øö]/g, "o") // Replace special chars
    .replace(/[åä]/g, "a") // Replace special chars
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
