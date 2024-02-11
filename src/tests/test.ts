import { setNestedValue } from '../index'

function test() {
    const json = {}
    // setNestedValue(json, "hoge.fuga.piyo", 100);
    setNestedValue(json, "hoge.fuga.0", 100);
    console.log(json)

    setNestedValue(json, "hoge.fuga.1", 200);
    console.log(json)

    setNestedValue(json, "bar.0.piyo", 300);
    console.log(json)

    setNestedValue(json, "bar.2.piyo", 400);
    console.log(json)
}

test();