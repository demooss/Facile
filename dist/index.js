(()=>{
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
        body.match(/\{\{([^}]+)\}\}/g).forEach((e) => {
            const classNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
            var className = "";
            for (let i = 0; i < 8; i++) {
            const rnum = Math.floor(Math.random() * classNameChars.length)
            className += classNameChars.substring(rnum, rnum + 1)
            };

            let t = e;

            // input Value 받아옴
            document.querySelectorAll('[bind-value]').forEach((v)=>{
                if(v.value){
                    if(isNaN(v.value)){
                        t = t.replaceAll(v.getAttribute('bind-value'),  `\"${v.value}\"`);
                    }else{
                        t = t.replaceAll(v.getAttribute('bind-value'),  v.value);
                    }
                }else{
                    t = t.replaceAll(v.getAttribute('bind-value'),  '0');
                }
            });
            t = t.replaceAll('{','');
            t = t.replaceAll('}','');
            t =  new Function(`return ${t}`)();

            // input이 변경될때마다 실행
            window.addEventListener('input',()=>{
                let m = e;
                let attributeValue = "";
                // input Value 받아옴
                m = m.replaceAll('{','');
                m = m.replaceAll('}','');
                document.querySelectorAll('[bind-value]').forEach((v)=>{
                    attributeValue = v.getAttribute('bind-value');
                    if(m.matchAll(attributeValue)){
                        if(v.value){
                            if(isNaN(v.value)){
                                m = m.replaceAll(attributeValue,  `\"${v.value}\"`);
                            }else{
                                m = m.replaceAll(attributeValue,  v.value);
                            }
                        }else{
                            m = m.replaceAll(attributeValue,  '0');
                        }
                    }
                });
                m = new Function(`return ${m}`)();
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

    document.querySelector('body').innerHTML = App();
})();