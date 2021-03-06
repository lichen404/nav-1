const $siteList = $('.siteList')
const $lastLi = $('li.last')
const data = localStorage.getItem('data')
const dataObject = JSON.parse(data)
const hashMap = dataObject || [{
    logo: 'L',
    url: 'https://www.liaoxuefeng.com'
}, {
    logo: 'G',
    url: 'https://www.google.com'
}, {
    logo: 'B',
    url: 'https://www.baidu.com'
}, {
    logo: 'G',
    url: 'https://www.github.com'
}, {
    logo: 'W',
    url: 'https://www.weibo.com'
}]

const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是?')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0],
        url: url


    })

    render()
})




const render = () => {
    $siteList.find('li:not(.last)').remove()
    $siteList.find('a').remove()
    hashMap.forEach((node, index) => {
        const $li = $(` <li>
     
            <div class="site">
                <div class="logo"><img src="${ 'https://www.'+ simplifyUrl(node.url) + '/favicon.ico'}" alt="${node.logo}"  onerror= "this.src = './default.6c4f69e4.png';this.onerror=null"></img>  </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })

}

render()

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('data', string)
}


$(document).on('keypress', (e) => {
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
$('.searchForm').on('keypress', (e) => {
    e.stopPropagation()
})