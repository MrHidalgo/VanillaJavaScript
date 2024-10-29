/**
 * @name loadComponent
 * @param containerSelector
 * @param templatePath
 * @param data
 * @returns {Promise<void>}
 */
async function loadComponent(containerSelector, templatePath, data = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Failed to load template from ${templatePath}`);
    }
    const template = await response.text();

    container.innerHTML = template;

    for (const key of Object.keys(data)) {
      const element = container.querySelector(`#${key}`);
      if (element) element.textContent = data[key];
    }
  } catch (error) {
    console.error(`Error loading component from ${templatePath}:`, error);
  }
}

/**
 * @name loadSection
 * @param selector
 * @param filePath
 * @param data
 * @param callback
 */
function loadSection(selector, filePath, data = {}, callback) {
  if (document.querySelector(selector)) {
    loadComponent(selector, filePath, data).then(() => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  }
}

export { loadComponent, loadSection };
