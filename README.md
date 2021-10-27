> 纯前端在线构建自己风格的简历

### 使用

[体验](http://stonehank.github.io/diy-resume/)

> 提示：在桌面端开启可显示步骤教程（包括每个区域的作用）

### 特点

* **无后端，无需注册登录等繁琐程序**，创建并且免费导出为PDF，IMG或者JSON，所见即所得

* 支持简易模式和构建模式

    简易模式即输入信息选择模板
    
    构建模式，拖拽构建结构，字体间距颜色等CSS属性可自由调节（只在桌面端有效）
    
* 为了操作方便，会按优先顺序使用`IndexedDB/LocalStorage/Cookie`保存用户操作记录 

## 数据

在非构建模式（即输入信息，套用模板），简历存在数据格式如下

```
export default {
    fullName:'',
    email:'',
    country:'',
    city:'',
    phone:'',
    description:'',
    jobPosition:'',
    avatar:'',
    employments:[
        {
            company:'',
            startAt:'',
            endAt:'',
            jobPosition:'',
            description:['']
        }
    ],
    educations:[
        {
            school:'',
            degree:'',
            startAt:'',
            endAt:'',
            city:'',
            description:'',
        }
    ],
    skills:[
        {
            label:'',
            value:50,
        }
    ],
    projects:[
        {
            name:'',
            link:{
                value:'',
                href:'',
            },
            description:'',
            startAt:'',
            endAt:'',
        }
    ]
}

```

## 模板制作

(此功能正在完善中)


## 一些问题

##### 我填好资料后，套用模板，发现超出了范围怎么办？

A: 这个是设计用单页简历使用的，如果你的字数过多，首先要做的请尝试精炼，语句以精炼为美；如果还是超出，可以尝试使用构建模式对模板进行间距，字体大小等修改

##### 导出为PDF后，渲染比较慢怎么办？

A: 这个问题暂时无法解决，可能的原因是css属性过多导致PDF渲染慢，目前禁用了`letter-space`后提升很大，更多信息可在此了解[https://github.com/parallax/jsPDF/issues/3137#issuecomment-886480913](https://github.com/parallax/jsPDF/issues/3137#issuecomment-886480913)

