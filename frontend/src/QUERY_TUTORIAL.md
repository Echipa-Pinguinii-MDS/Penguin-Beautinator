In partea de sus a fisiererelor unde e folosit:
```javascript
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
```

Request:
```javascript
axios({
    method: 'put' | 'post' | 'delete' | 'get',
    url: 'user/info/' | 'login/',
    data: {
        'user_email': item.email,
        'label': value,
    },
    headers: {
        "content-type": "application/json"
    },
}).then(result => apel_de_functie(parametrii));
```

Valorile intoarse de request se gasesc in:
```javascript
result.data;
// result.data este un json
// valorile din el se pot accesa asa:
result.data['label']
```
