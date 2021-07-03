export function transformRenderedData(data) {
    const replaced = data.replace(/&quot;/g, '\"');

    return JSON.parse(replaced);
}