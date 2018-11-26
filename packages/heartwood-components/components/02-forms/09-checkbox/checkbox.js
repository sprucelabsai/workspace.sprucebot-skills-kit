function h(type, props, ...children) {
	return { type, props, children };
}
function setProp($target, name, value) {
	$target.setAttribute(name, value);
}
function setProps($target, props) {
	Object.keys(props).forEach(name => {
	  setProp($target, name, props[name]);
	});
}
function createElement(node) {
	if (typeof node === 'string') {
	  return document.createTextNode(node);
	}
	const $el = document.createElement(node.type);
	setProps($el, node.props);
	node.children
	  .map(createElement)
	  .forEach($el.appendChild.bind($el));
	return $el;
}

const svg = (
	h('svg', {
		class: 'checkbox-item__icon checkbox-item__icon-yes',
		xmlns: 'http://www.w3.org/2000/svg',
		width: '24',
		height: '24',
		viewBox: '0 0 24 24'
	}, h('path', {
		d: 'M0 0h24v24H0z',
		fill: 'none'
	}),
		h('path', {
			d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
		})
	)
)



const $root = document.getElementById('root');
if ($root) {
	$root.appendChild(createElement(svg));
}

console.log({ svg })