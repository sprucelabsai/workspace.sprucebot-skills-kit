export const imports = {
  'docz/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docz-index" */ 'docz/index.mdx'
    ),
  'src/components/Avatar/Avatar.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-avatar-avatar" */ 'src/components/Avatar/Avatar.mdx'
    ),
  'src/components/Avatar/UserAvatar.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-avatar-user-avatar" */ 'src/components/Avatar/UserAvatar.mdx'
    ),
  'src/components/Button/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-button-button" */ 'src/components/Button/Button.mdx'
    ),
  'src/components/ButtonGroup/ButtonGroup.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-button-group-button-group" */ 'src/components/ButtonGroup/ButtonGroup.mdx'
    ),
  'src/components/Card/Card.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-card" */ 'src/components/Card/Card.mdx'
    ),
  'src/components/ContextMenu/ContextMenu.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-context-menu-context-menu" */ 'src/components/ContextMenu/ContextMenu.mdx'
    ),
  'src/components/Card/components/CardBuilder.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-components-card-builder" */ 'src/components/Card/components/CardBuilder.mdx'
    ),
  'src/components/Card/components/CardBody.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-components-card-body" */ 'src/components/Card/components/CardBody.mdx'
    ),
  'src/components/Card/components/CardFooter.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-components-card-footer" */ 'src/components/Card/components/CardFooter.mdx'
    ),
  'src/components/Card/components/CardHeader.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-components-card-header" */ 'src/components/Card/components/CardHeader.mdx'
    ),
  'src/components/Card/components/CardSection.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-components-card-section" */ 'src/components/Card/components/CardSection.mdx'
    ),
  'src/components/Card/components/OnboardingCard.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-components-onboarding-card" */ 'src/components/Card/components/OnboardingCard.mdx'
    ),
  'src/components/Card/components/Scores.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-card-components-scores" */ 'src/components/Card/components/Scores.mdx'
    ),
}
