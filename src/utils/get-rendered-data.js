export function getRenderedData() {
    const { data } = window;

    if (!data) {
        return;
    }

    const replaced = data.replace(/&quot;/g, '\"');

    return JSON.parse(replaced);
}