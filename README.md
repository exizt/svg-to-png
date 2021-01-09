# svg_to_png
SVG 를 PNG 로 변환하는 코드입니다. 

HTML 과 JS 로 구성되어 있습니다. 

자유롭게 사용하세요.





# 라이선스

MIT 라이선스로 자유롭게 수정해서 사용하세요. 버그 수정 요청은 받지 않습니다. 





# 사용법

1. 다운로드 받습니다. 

2. sample.json.js 을 복사해서 'config.json.js'으로 이름을 변경해주고 presets 를 설정해줍니다. 

4. svg 파일은 'svg-data' 같은 폴더를 만들어서 잘 적어주고 config.json 에 잘 설정해줍니다. 





## config.json 설정

json 의 key 값은 각기 다르게 구성해줍니다. 그 외의 설정은 아래와 같이 합니다.



* name : 'select box'에서 보여질 명칭. 본인이 구분하기 쉽게 대충 설정합니다.
* foregroundSvg : 가운데에 들어갈 svg 의 경로를 적습니다.
* backgroundSvg : 배경에 들어갈 svg 의 경로를 적습니다. 불필요한 경우 'null'을 입력합니다.
* sizes : 배열 형태로 숫자값을 적습니다. 예시 : [36, 48, 128, 256, 512, 1024] 같이 필요한대로 적습니다.



