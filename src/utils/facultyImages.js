/**
 * facultyImages.js
 *
 * Loads the faculty-images.json manifest (generated at dev/build time)
 * and provides a helper to look up each faculty's local photo path.
 *
 * Falls back gracefully to `null` if a photo is missing (TeacherReveal
 * already handles null/missing photos with a monogram fallback).
 */

// The manifest is served as a static asset from public/
// We import it with ?url to avoid bundling it and instead load at runtime.
// This way re-running generate-manifest refreshes the photo without rebuilding.
let _manifest = null;
let _loading = null;

export async function loadFacultyImageManifest() {
  if (_manifest) return _manifest;
  if (_loading) return _loading;

  _loading = fetch('/faculty-images.json')
    .then((r) => {
      if (!r.ok) throw new Error('manifest not found');
      return r.json();
    })
    .then((data) => {
      _manifest = data;
      _loading = null;
      return _manifest;
    })
    .catch(() => {
      _manifest = {};
      _loading = null;
      return _manifest;
    });

  return _loading;
}

/**
 * Get photo URL for a faculty number (1-indexed).
 * Returns the local path if available, or null if missing.
 * @param {number} facultyNumber - 1 through 22
 * @returns {string|null}
 */
export function getFacultyPhoto(facultyNumber) {
  if (!_manifest) return null;
  return _manifest[String(facultyNumber)] ?? _manifest[facultyNumber] ?? null;
}
