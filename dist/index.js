/**
 * Copyright (c) 2022 DE:MO
 * MIT License
 * Github : https://github.com/demooss/undefined
 */
(()=>{
    addEventListener('load',()=>{
        /**
         * Body 데이터 값 저장
         */
        let body = document.querySelector('body').innerHTML;
    
        /**
         * 데이터 바인딩
         * @returns 바인딩된 데이터 값
         */
        const App = () => {
            let ret = body;
            // {{}} 문법으로 작성된 부분을 찾음
            body.match(/\{\{([^}]+)\}\}/g).forEach((e) => {
                const classNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
                var className = "";
                for (let i = 0; i < 8; i++) {
                const rnum = Math.floor(Math.random() * classNameChars.length)
                className += classNameChars.substring(rnum, rnum + 1)
                };
    
                // 데이터가 꼬이지않도록 t로 복제
                let t = e;
    
                // input Value 받아옴
                document.querySelectorAll('[bind-value]').forEach((v)=>{
                    if(v.value){
                        // 숫자인지 판단
                        if(isNaN(v.value)){
                            t = t.replaceAll(v.getAttribute('bind-value'),  `\"${v.value}\"`);
                        }else{
                            t = t.replaceAll(v.getAttribute('bind-value'),  v.value);
                        }
                    }else{
                        // 인풋의 타입이 number 일때 데이터가 없을경우 0으로 설정
                        if(v.type == "number"){
                            t = t.replaceAll(v.getAttribute('bind-value'),  '0');
                        }else{
                            // 그 외 타입은 데이터가 없을경우 Null
                            t = t.replaceAll(v.getAttribute('bind-value'),  '"Null"');
                        }
                    }
                });
                t = t.replaceAll('{','');
                t = t.replaceAll('}','');
                t = new Function(`return ${t}`)();
    
                // input이 변경될때마다 실행
                window.addEventListener('input',()=>{
                    let m = e;
                    let attributeValue = "";
                    // 데이터 바인딩 문법에서 {{}}를 지움
                    m = m.replaceAll('{','');
                    m = m.replaceAll('}','');
    
                    // input Value 받아옴
                    document.querySelectorAll('[bind-value]').forEach((v)=>{
                        attributeValue = v.getAttribute('bind-value');
                        if(m.matchAll(attributeValue)){
                            if(v.value){
                                // 숫자인지 판단
                                if(isNaN(v.value)){
                                    m = m.replaceAll(attributeValue,  `\"${v.value}\"`);
                                }else{
                                    m = m.replaceAll(attributeValue,  v.value);
                                }
                            }else{
                                // 인풋의 타입이 number 일 경우 초기값은 0으로 설정
                                if(v.type == "number"){
                                    m = m.replaceAll(v.getAttribute('bind-value'),  '0');
                                }else{
                                    // 그 외 타입은 데이터가 없을경우 Null
                                    m = m.replaceAll(v.getAttribute('bind-value'),  '"Null"');
                                }
                            }
                        }
                    });
                    m = new Function(`return ${m}`)();

                    // 바인딩한 데이터가 기존 데이터와 다른 부분만 교체
                    if(document.querySelector(`.${className}`).innerHTML != m){
                        document.querySelector(`.${className}`).innerHTML = m;  
                    }
                });
    
                if(t != undefined){
                    ret = ret.replaceAll(e,`<span class="${className}">${t}</span>`);
                }else{
                    ret = ret.replaceAll(e,``);
                }
            });
            return ret;
        };
        
        // 로딩된 처음 1회만 실행되어야함
        document.querySelector('body').innerHTML = App();
    })
})();