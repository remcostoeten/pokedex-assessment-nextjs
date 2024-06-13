Liev dagboek,

My go-to weapon of choice is Next.js. Because React, on steroids. Just used to it. Same goes for Tailwind although I love native CSS (Sass...). But getting a proof of concept/MVP out there is just way faster with Tailwind.

I usually go for a structure like this:
```bash
┌─[remcostoeten@keyboard] - [~/showcase] - [10078]
└─[$] tree                                                                                          [11:52:08]
.
├── app
│   └── somepage
│       └── components
│           └── nested-components-colocated.txt
├── components
│   └── somecomp.tsx
└── core
    ├── config
    └── utils
```

There are a dozen ways to work with APIs in JavaScript and I've always opted (in Next.js) for API routes, but server actions, basically functions, are the new hot thing so I dabbled with those and I like them. I think I will use them more in the future. Also looked into react query because I hear quite a lot of good things about it, but due to time and learn curve I opted for what i alreadyt knew. A simple fetch worked fine in this case.

Even though the API was local I still opted for a config file with the base URLs etc. Best practices would've been to use an env and then next.public.....

I tend to get creative at random moments so halfway through I suddenly got an aha moment which made me switch from logic to UI work. If I would've started over again I would've finished all logic first and then UI, because knowing me I get carried away with UI and minor details which don't really matter (if there is no ticket, plan, or design for it).

Regarding packages. For basic UI (components/ui) I used some Chakra-UI. Installed Framer Motion but did not even get to doing any fancy animations. Hovering the Pokémon I initially did with Framer Motion but that was a classic example of overengineering. The only real package I used was Sonner, which is (IMO) the best toast API there is.

The Pokémon list is a bit messy and could've been extracted into smaller parts if I had more time. Also, things like a toolbar, search, pagination etc., are missing. But I think the core functionality is there.

Regarding the catch mechanism, it's just literally changing the string. A little more time would've been local storage, and a bit more than that I would've opted for NoSQL ala Firebase where CRUD is done fairly easily.

Also, minor details like subtracting the inventory, adding things to the my Pokémon page etc. are things I would've wanted to do (and maybe will do if I'm bored).

Overall quite happy with the speed and amount of bugs. There is a little bit of state magic which  I had to GPT (the image state). Thats funny enough the thing I sturggled with the most, from reading the API, to centering the hover (classic skillissue), to the image state. But I survived.

Also some hydration erros which i wouldve fixed with builder.io hydration overlay (helper package). Also a big fan of skeleton loaders, since there is some layout shift. But I will tell project manager to add that in the next sprint.