---
layout: default
title: Drawing
pagination:
  alias: posts
  data: posts.all
  size: 500
---

# All Drawings

<div id="dribbble"></div>

<script>
    async function loadImages(){
        const response=await fetch("https://api.dribbble.com/v2/user/shots?access_token=7686c54fbfce86e6836df572d9af7d6542f744d9c09b0ac09d51db00c5e31dee")
        const data=await response.json()

        const imageContainer=document.querySelector("#dribbble")

        data.forEach(( entry) => {
            const image=document.createElement("img")
            image.src=entry.images.normal
            image.alt=entry.title

            imageContainer.appendChild(image)

        })
    }
loadImages()
</script>