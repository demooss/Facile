let body = document.querySelector('body').innerHTML;

const App = () => {
    let ret = body;
    body.match(/{? ?{.*}? ?}/g).forEach((e) => {
        const classNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        var className = "";
        for (let i = 0; i < 8; i++) {
          const rnum = Math.floor(Math.random() * classNameChars.length)
          className += classNameChars.substring(rnum, rnum + 1)
        };

        let t = e;

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

        window.addEventListener('input',()=>{
            let m = e;
            document.querySelectorAll('[bind-value]').forEach((v)=>{
                if(v.value){
                    if(isNaN(v.value)){
                        m = m.replaceAll(v.getAttribute('bind-value'),  `\"${v.value}\"`);
                    }else{
                        m = m.replaceAll(v.getAttribute('bind-value'),  v.value);
                    }
                }else{
                    m = m.replaceAll(v.getAttribute('bind-value'),  '0');
                }
            });
            m = m.replaceAll('{','');
            m = m.replaceAll('}','');
            m =  new Function(`return ${m}`)();
            document.querySelector(`.${className}`).innerHTML = m;  
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