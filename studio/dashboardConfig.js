export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'Deploys happen automatically when you publish posts. If you want to manually trigger a deploy, click these buttons.',
              sites: [
                {
                  buildHookId: '5d3d18f123cbe9a226844184',
                  title: 'marisamorby.com',
                  name: 'marisamorby',
                  apiId: 'ec1eda55-820a-40d7-b2cc-42d5c59da1c2'
                },
                {
                  buildHookId: '5cd87c930f75d2f0fb8108f5',
                  title: 'Admin Interface',
                  name: 'sanity-gatsby-blog-studio-cbqhgfxm',
                  apiId: '37144c3b-e243-4c4d-8f34-a843bfbda3c7'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/marisamorby/marisamorby.com',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://marisamorby.com',
            category: 'apps'
          }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
