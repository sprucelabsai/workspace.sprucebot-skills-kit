export const imports = {
  'docz/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docz-index" */ 'docz/index.mdx'
    ),
  'src/components/ButtonGroup/ButtonGroup.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-button-group-button-group" */ 'src/components/ButtonGroup/ButtonGroup.mdx'
    ),
  'src/components/Button/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-button-button" */ 'src/components/Button/Button.mdx'
    ),
  'src/components/ContextMenu/ContextMenu.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-context-menu-context-menu" */ 'src/components/ContextMenu/ContextMenu.mdx'
    ),
}
