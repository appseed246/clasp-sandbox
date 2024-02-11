/**
 * エントリポイントの関数
 */
function main() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getDataRange();
    const values = range.getValues();

    const keys = values[0]; // キー情報
    const rows = values.slice(1); // データ
    rows.forEach(
        (row) => Logger.log(JSON.stringify(generateJson(keys, row), null, 2))
    );
}

// ==============================
// Jsonの生成
// ==============================
export function generateJson(keys: string[], row: any[]): Object {
    return keys.reduce((acc, key, index) =>
        deepMerge(acc, getNestedValue(key.split('.'), row[index])), {})
}

export function getNestedValue(keyArray: string[], value: any): Object {
    const [head, ...tail] = keyArray;

    const child = () => (tail.length === 0) ? value : getNestedValue(tail, value)

    if (isArrayIndex(head)) {
        return [child()]
    } else {
        return { [head]: child() }
    }
}

const isArrayIndex = (key: string) => {
    const number = parseInt(key, 10);
    return !isNaN(number) && number.toString() === key;
}

// ==============================
// deepMergeの実装
// ==============================
type GenericObject = { [key: string]: any };

const isObject = (item: any): item is GenericObject =>
    item && typeof item === 'object' && !Array.isArray(item);

export const deepMerge = (target: GenericObject, source: GenericObject): GenericObject =>
    Object.keys(source).reduce((acc, key) => {
        const sourceValue = source[key];
        const targetValue = acc[key];

        let newValue;
        if (isObject(sourceValue)) {
            newValue = deepMerge(targetValue || {}, sourceValue);
        } else if (Array.isArray(sourceValue)) {
            newValue = Array.isArray(targetValue) ? targetValue.concat(sourceValue) : [...sourceValue];
        } else {
            newValue = sourceValue;
        }

        return { ...acc, [key]: newValue };
    }, target);


