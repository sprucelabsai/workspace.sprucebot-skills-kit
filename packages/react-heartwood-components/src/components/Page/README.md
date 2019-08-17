# Pages

Pages are comprised of several important components: a page (the outer wrapper), a header (configured through the page), a sidebar (set on the page), and a content section (`<Page.Content />`).

## Page content

The content of your page goes into a `<PageContent />`. Beyond that, all pages are comprised of Layout configution. Make sure you check the Layout stories for building your pages.

## Headers and back links

It's important to manager your header and back links effectively. Use it in conjuction with:

```js
componentDidMount = () => {
	this.props.skill.ready({ showHeader: false })
}
```

## Skill View setting pages

Any special considerations here.

## Calendar Right Rail

Some things to consider here!

## When and how to use sidebars

Add things I should know here

## Using tabs

Never use tabs when a Skill View is rendered as a tab, you can get tabs in tabs.
