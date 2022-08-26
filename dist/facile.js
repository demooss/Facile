/**
 * Copyright (c) 2022 DE:MO
 * MIT License
 * Github : https://github.com/demooss/undefined
 */
 (()=>{
    addEventListener('load',()=>{
        const component = (elementName, element) => {
            customElements.define(elementName, class extends HTMLElement {
                constructor() {
                    super();
                    this.outerHTML = element;
                }
            });
        };

        document.querySelectorAll('template').forEach((el)=>{
            component(el.getAttribute('name'), el.innerHTML);
        });
        
        /**
         * Body 기본 내용 저장
         */
        let body = document.querySelector('body').innerHTML;

        /**
         * "{{ }}" 문법이 포함된 엘리먼트를 반환합니다.
         * @returns "{{ }}" 문법이 포함된 엘리먼트를 Array로 반환
         */
        const findByText = () => {
            return [...document.querySelectorAll('*')].reduce(
                (acc, val) => {
                for (const {
                    nodeType,
                    textContent,
                    parentElement
                    } of val.childNodes) {
                    if (nodeType === 3 && textContent.match(/\{\{([^}]+)\}\}/g) && !(parentElement.tagName === 'SCRIPT')) acc.push(parentElement);
                }
                return acc;
                }, []
            );
        };

        /**
         * 바인딩 문법이 포함된 엘리먼트 Array
         */
        let bindElement = findByText();

        /**
         * Facile 데이터바인딩 기본
         */
        const facile = () => {

            findByText().forEach((e)=>{
                e.innerText.match(/\{\{([^}]+)\}\}/g).forEach((el)=>{
                    let t = el;
                    t = t.replaceAll('{','');
                    t = t.replaceAll('}','');
                    t = new Function(`return ${t}`)();
                    let text = e.innerText.replaceAll(el, t);
                    
                    if(e.innerText != text){
                        e.innerText = text;
                    }
                });
            });
        };

        facile();
        document.querySelector('body').innerHTML.match(/\{\{([^}]+)\}\}/g).forEach((el)=>{
            let t = el;
            t = t.replaceAll('{','');
            t = t.replaceAll('}','');
            t = new Function(`return ${t}`)();
            document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replaceAll(el, t);
        });

        window.addEventListener('input',()=>{
            console.log(bindElement);
            document.querySelectorAll('[bind-value]').forEach((e)=>{
                if(e.value){
                    new Function(`${e.getAttribute('bind-value')} = "${e.value}"`)();
                }
                body.match(/\{\{([^}]+)\}\}/g).forEach((el)=>{
                    let t = el;
                    t = t.replaceAll('{','');
                    t = t.replaceAll('}','');
                    t = new Function(`return ${t}`)();
                    let text = e.innerText.replaceAll(el, t);
                    
                    
                });
            });
            facile();
        });
    })
})();
