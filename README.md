# undefined
하드코딩해서 스벨트 따라하기


## 설치
그냥 자바스크립트 가져오는것 처럼 똑같이 가져오세요.

아래 코드를 가자아앙아아앙 아래 둬야해요.
```
  ...
  <script src="./index.js"></script>
```
이렇게.

## 데이터 바인딩
그냥 따라치세요.
```
     <p>{{ op.t }}</p>

    <script>
        let op = {
            t:"어머나 세상에"
        }
    </script>
    <script src="./index.js"></script>
```
이렇게 치면 당연히 `{{ op.t }}` 부분에 `어머나 세상에` 가 들어가지않을까요

## 더하기
```
  <p>{{ 1+2 }}</p>
```
수학 잘 하시면 `{{ 1+2 }}` 부분에 뭐가 들어갈지 당연히 아실꺼에요

## 인풋 Value 바인딩
첫번째 인풋에 쓴거랑 두번째 인풋에 쓴것을 더해봅시다
```
    <input type="text" bind-value="test1">
    <input type="text" bind-value="test2">

    <p>{{ test1+test2 }}</p>
```

## 그냥 아무거나 해보세요
사실 `{{ }}` 안에 js 코드 아무거나 넣어도 다 실행 됩니다
