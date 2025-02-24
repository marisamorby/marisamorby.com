---
publishedAt: 2020-10-14T17:00:00.000Z

title: >
  Creating a "good first issue" for new OSS contributors
description: >
  Tips on creating a good user experience for first time contributors to OSS.

type: writing
topics:
- design

---

I thought this year might be a good time to try [Hacktoberfest](https://hacktoberfest.digitalocean.com/), and wanted to contribute to a repo that's impactful for climate change. 

Since I don't often contribute to open source issues, I thought it might be helpful to list some of the things that are really helpful for a good first issue to a new contributor. So, I guess in a surprise to no one, I'm about to write a post on creating a good user experience for first time contributors.

I think that the spirit of tagging something as a "good first issue" is great, but it's also important to think about who is it a good first issue for? And when we ask that question, there are some additional things that would be helpful to include.

## List out the languages involved to solve the issue In the issue
It's helpful to know before you get too far down the road what languages are necessary in order to complete the task. If it's a first issue, or for something like Hacktoberfest, the person completing the issue won't have a lot of context about the repo or the languages for the codebase. 

## Direct people to places in the repo that help them set context
Where does someone start? You should assume that someone who is trying to participate in Hacktoberfest might be new to GitHub or new to open source. In both cases, providing instructions in the repo on where to find the relevant information for completing the task is useful. I know the README is typically a good place for that, but linking to the README in the issue is a great shortcut for people.

## Link to helpful documentation
Is there additional documentation that's necessary for them to complete the task? Or documentation that will help them understand what they need to do? Linking to that in the issue is really helpful so that they don't have to spend a bunch of time trying to find information; especially if that information might lead them down the wrong path.

## Provide relevant examples and make the issue specific and clear
What must be true in order for the issue to be considered done? If something needs to be added or fixed, what is currently happening, on what pages is it happening, and what change do you expect? If you're asking someone to add something new, what should that new thing do and what URL structure should it follow? Additionally, including full links or snapshots in the issue will help people understand both the current state and what you expect to happen. It's also helpful to include relevant PRs if they exist.

## Make sure the change is isolated 
By isolating the change, if something doesn't work as expected, it doesn't create problems down the road. I think good first issues are typically small issues that don't impact other parts of the system. While it's best if the code is fully tested before it's merged, making sure that the issue won't bring down the whole site is important. Isolating the issue also means that the person doesn't have to understand how the entire system works in order to complete the task.

## It's all about context and setting expectations
In general, creating a good first issue for new maintainers really involves **providing as much context as possible and setting clear expectations.**  

Remember that the person wanting to complete an issue is typically excited. They've found something that they are looking forward to contributing to, and that they think they can accomplish. But they're also walking into a repo and an issue with little to no information. By making the first issues have as much context as possible and isolating the issue down to something very specific, you give the person a better chance at completing the task and actually growing into a maintainer.