import prisma from "../db/prismaclient";
import { hash } from "@node-rs/argon2";

async function main() {
  "use server";
  const passwordHash = await hash("admin", {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
});

const navlinks = [{
  name: "Home",
  href: "/",
  css: "",
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
}]

const footlinks = [{
  name: "",
  href: "https://github.com/MODSetter",
  css: "",
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
}]

const bannercontent = `<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><h2>Introducing <mark data-color="var(--novel-highlight-red)" style="background-color: var(--novel-highlight-red); color: inherit">Next-Blog</mark></h2><p>Next-Blog is a <strong>fast, SEO Friendly</strong> blogging based CMS supporting multiple themes, <span style="color: #008A00"><mark data-color="var(--novel-highlight-blue)" style="background-color: var(--novel-highlight-blue); color: inherit">Notion like WYSIWYG editor with AI - Assistant Writer</mark></span>, <mark data-color="var(--novel-highlight-pink)" style="background-color: var(--novel-highlight-pink); color: inherit">Modern Layouts </mark>, <u><strong><em>Admin Dashboard</em></strong></u> and Custom Components. Whether you want to make a Single Page Applications or a blog, next-blog got you covered. Next-Blog aim's to keep the paid SaaS dependencies to minimum . Currently we use Vercel-Blob for file management and we are looking into eliminating this dependency as well.</p><h2>Features :</h2><h3><u><mark data-color="var(--novel-highlight-yellow)" style="background-color: var(--novel-highlight-yellow); color: inherit">Fast &amp; SEO Friendly</mark></u></h3><p>Homepage &amp; Posts are rendered on server for fast response times with proper SEO meta tags, keywords and open graph images.</p><h3><u><mark data-color="var(--novel-highlight-red)" style="background-color: var(--novel-highlight-red); color: inherit">Multiple themes</mark></u></h3><p>Next-Blog internally uses <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/ibelick/background-snippets">Background Snippets </a>to give support for 21 Light and Dark Themes.</p><h3><u><mark data-color="var(--novel-highlight-blue)" style="background-color: var(--novel-highlight-blue); color: inherit">Notion like WYSIWYG editor</mark></u></h3><p>Next-Blog uses Novel, a beautiful Notion like WYSIWYG editor powered with AI Assistant writer. Use any LLM's from Open-AI to boost your productivity in content creation.</p><h3><u><mark data-color="var(--novel-highlight-green)" style="background-color: var(--novel-highlight-green); color: inherit">Layouts and Components</mark></u></h3><p>Next-Blog currently supports 5 layouts and have out of box support for 4 post components(2 Large &amp; 2 Small), 2 Navbars and 2 Footers. Customize components according to your liking or contribute components to our GitHub.</p><h3><u><mark data-color="var(--novel-highlight-purple)" style="background-color: var(--novel-highlight-purple); color: inherit">Admin Dashboard</mark></u></h3><p>Next-Blog have its own dashboard to keep the management of your websites streamlined.</p><h2>TECH STACK</h2><ul class="list-disc list-outside leading-3 -mt-2 tight" data-tight="true"><li class="leading-normal -mb-2"><p><u><strong><em>Framework:</em></strong></u> Next.js</p></li><li class="leading-normal -mb-2"><p><u><strong><em>UI:</em></strong></u> Tailwind CSS, Shadcn</p></li><li class="leading-normal -mb-2"><p><u><strong><em>File Uploads/Management:</em></strong></u> Vercel-Blob</p></li><li class="leading-normal -mb-2"><p><u><strong><em>Content Editor:</em></strong></u> <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/steven-tey/novel">Novel</a>, a Notion like WYSIWYG editor with AI assistant writer.</p></li><li class="leading-normal -mb-2"><p><u><strong><em>Comment/Discussions:</em></strong></u> <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/giscus/giscus">Giscus</a>, a comment system powered by GitHub Discussions.</p></li><li class="leading-normal -mb-2"><p><u><strong><em>AI/LLM:</em></strong></u>  Vercel AI SDK</p></li></ul><p></p><p></p></body></html>`
  const adminUser = await prisma.user.create({
    data: {
        id: "1",
        name: "Next Blogger",
        avatar: "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png",
        username: "admin",
        password_hash: passwordHash,
        navbarlogo: "",
        navbar: "NAVBAR-1" ,
        maingrid: "GRID-1",
        footer: "FOOTER-1",
        navbarlinks: JSON.stringify(navlinks),
        footerlinks: JSON.stringify(footlinks),
        defaultDark: "D-5",
        defaultLight: "L-7",
    },
  });

  const testPost = await prisma.post.create({
    data: {
      slug: "nextblog",
      content: `<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><h2>Introducing <mark data-color="var(--novel-highlight-red)" style="background-color: var(--novel-highlight-red); color: inherit">Next-Blog</mark></h2><p>Next-Blog is a <strong>fast, SEO Friendly</strong> blogging based CMS supporting multiple themes, <span style="color: #008A00"><mark data-color="var(--novel-highlight-blue)" style="background-color: var(--novel-highlight-blue); color: inherit">Notion like WYSIWYG editor with AI - Assistant Writer</mark></span>, <mark data-color="var(--novel-highlight-pink)" style="background-color: var(--novel-highlight-pink); color: inherit">Modern Layouts </mark>, <u><strong><em>Admin Dashboard</em></strong></u> and Custom Components. Whether you want to make a Single Page Applications or a blog, next-blog got you covered. Next-Blog aim's to keep the paid SaaS dependencies to minimum . Currently we use Vercel-Blob for file management and we are looking into eliminating this dependency as well.</p><h2>Features :</h2><h3><u><mark data-color="var(--novel-highlight-yellow)" style="background-color: var(--novel-highlight-yellow); color: inherit">Fast &amp; SEO Friendly</mark></u></h3><p>Homepage &amp; Posts are rendered on server for fast response times with proper SEO meta tags, keywords and open graph images.</p><h3><u><mark data-color="var(--novel-highlight-red)" style="background-color: var(--novel-highlight-red); color: inherit">Multiple themes</mark></u></h3><p>Next-Blog internally uses <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/ibelick/background-snippets">Background Snippets </a>to give support for 21 Light and Dark Themes.</p><h3><u><mark data-color="var(--novel-highlight-blue)" style="background-color: var(--novel-highlight-blue); color: inherit">Notion like WYSIWYG editor</mark></u></h3><p>Next-Blog uses Novel, a beautiful Notion like WYSIWYG editor powered with AI Assistant writer. Use any LLM's from Open-AI to boost your productivity in content creation.</p><h3><u><mark data-color="var(--novel-highlight-green)" style="background-color: var(--novel-highlight-green); color: inherit">Layouts and Components</mark></u></h3><p>Next-Blog currently supports 5 layouts and have out of box support for 4 post components(2 Large &amp; 2 Small), 2 Navbars and 2 Footers. Customize components according to your liking or contribute components to our GitHub.</p><h3><u><mark data-color="var(--novel-highlight-purple)" style="background-color: var(--novel-highlight-purple); color: inherit">Admin Dashboard</mark></u></h3><p>Next-Blog have its own dashboard to keep the management of your websites streamlined.</p><h2>TECH STACK</h2><ul class="list-disc list-outside leading-3 -mt-2 tight" data-tight="true"><li class="leading-normal -mb-2"><p><u><strong><em>Framework:</em></strong></u> Next.js</p></li><li class="leading-normal -mb-2"><p><u><strong><em>UI:</em></strong></u> Tailwind CSS, Shadcn</p></li><li class="leading-normal -mb-2"><p><u><strong><em>File Uploads/Management:</em></strong></u> Vercel-Blob</p></li><li class="leading-normal -mb-2"><p><u><strong><em>Content Editor:</em></strong></u> <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/steven-tey/novel">Novel</a>, a Notion like WYSIWYG editor with AI assistant writer.</p></li><li class="leading-normal -mb-2"><p><u><strong><em>Comment/Discussions:</em></strong></u> <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/giscus/giscus">Giscus</a>, a comment system powered by GitHub Discussions.</p></li><li class="leading-normal -mb-2"><p><u><strong><em>AI/LLM:</em></strong></u>  Vercel AI SDK</p></li></ul><p></p><p></p></body></html>`,
      opengraphimage: "https://i.ibb.co/61TLtxz/logo.png",
      title: "Introducing Next-Blog",
      authorId: "1",
      metaDescription: "Next-Blog is a fast, SEO Friendly blogging based CMS supporting multiple themes, Notion like WYSIWYG editor with AI - Assistant Writer, Modern Layouts , Admin Dashboard and Custom Components.",
      metaKeywords: ["NEXTBLOG","FAST","NEW"],
      tags: {
        create: {
          tagname: "new"
        }
      },
      visibility: true
    }
  })

  const createGrids = await prisma.grid.createMany({
    data: [

      { id: 'GRID-1', comp_one: "CUSTOM-BANNER-nextblog", comp_two: "POSTLIST-LG-2", comp_three: "", comp_four: "", comp_five: ""},
      { id: 'GRID-2', comp_one: "", comp_two: "", comp_three: "", comp_four: "", comp_five: ""},
      { id: 'GRID-3', comp_one: "", comp_two: "", comp_three: "", comp_four: "", comp_five: ""},
      { id: 'GRID-4', comp_one: "", comp_two: "", comp_three: "", comp_four: "", comp_five: ""},
      { id: 'GRID-5', comp_one: "", comp_two: "", comp_three: "", comp_four: "", comp_five: ""},
    ],
    skipDuplicates: true, 
  })

  const cmpt = await prisma.customComponent.create({
    data: {
      id: "nextblog",
      htmlContent: bannercontent,
      tailwindcss: "border-2 bg-emerald-500/20 backdrop-blur-lg rounded-3xl"
    }
  })
  console.log("LOADED INITIAL DATA",adminUser, createGrids, cmpt, testPost);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
