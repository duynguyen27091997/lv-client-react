import React from 'react';

const ResultCoding = () => {
    return (
        <div>
            <h5>Kết quả</h5>
            <div className={'result-coding'}>
                <div className={'Code__Result text-left mt-4'}>
                    {/*<div className="alert alert-success" role="alert">*/}
                    {/*    Hoan hô ! Bạn đã trả lời chính xác !*/}
                    {/*</div>*/}
                    <div className="alert alert-danger" role="alert">
                        Sai mất rồi ! Tìm câu trả lời khác thôi !
                    </div>
                    <div>
                        /sandbox/app.js:11
                        }sdas
                        ^

                        ReferenceError: sdas is not defined
                        at Object.get_array (/sandbox/app.js:11:6)
                        at Object. (/sandbox/appTest.js:12:22)
                        at Module._compile (internal/modules/cjs/loader.js:678:30)
                        at Object.Module._extensions..js (internal/modules/cjs/loader.js:689:10)
                        at Module.load (internal/modules/cjs/loader.js:589:32)
                        at tryModuleLoad (internal/modules/cjs/loader.js:528:12)
                        at Function.Module._load (internal/modules/cjs/loader.js:520:3)
                        at Function.Module.runMain (internal/modules/cjs/loader.js:719:10)
                        at startup (internal/bootstrap/node.js:228:19)
                        at bootstrapNodeJSCore (internal/bootstrap/node.js:576:3)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCoding;