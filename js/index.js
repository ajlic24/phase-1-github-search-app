document.addEventListener(`DOMContentLoaded`, () => {
    const submit = document.querySelector(`#github-form`)[1]
    const input = document.querySelector(`#github-form`)[0]
    
    submit.addEventListener(`click`, e => {
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${input.value}`)
        .then(resp => resp.json())
        .then(data => {
            data.items.forEach(({login, avatar_url, html_url}) => {
                let userUl = document.getElementById(`user-list`)
                let repoUl = document.getElementById(`repos-list`)
                let userLi = document.createElement(`li`)
                let link = document.createElement(`a`)
                let p = document.createElement(`p`)
                let img = document.createElement(`img`)
                let div = document.createElement(`div`)

                userLi.addEventListener(`click`, () => {
                    fetch(`https://api.github.com/users/${login}/repos`)
                    .then(resp => resp.json())
                    .then(data => {
                        data.forEach(repo => {
                            let repoLi = document.createElement(`li`)
                            repoLi.textContent = repo.name
                            repoUl.append(repoLi)
                        })
                    })
                })
                img.src = avatar_url
                link.href = html_url
                link.textContent = `check out their profile`
                userLi.textContent = login
                p.append(link)
                div.append(img, p)
                userLi.append(div)
                userUl.append(userLi)
                

            });
        })
    })
})