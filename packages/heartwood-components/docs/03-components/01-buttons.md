{{ render '@primary-button' pageContext merge=true}}

## When to use

Use buttons to trigger actions or navigate between views.

## When not to use

Don't use buttons inline with text. Instead, use simple links.

## How to style

Start by choosing a variation based on its use case. Use large and full-width options for quick style matching. For more nuanced styling, i.e. setting a custom height, use specificity in the parent component. For example, target `.some-skill .some-component .btn` to achieve higher specificity and override default styling.

## Properties

| **Property** | **Details**                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type         | One of [primary](/components/detail/primary-button), [secondary](/components/detail/secondary-button), [simple](/components/detail/simple-button), or [caution](/components/detail/caution-button) |
| Text         | Optional; Text to show                                                                                                                                                                             |
| Icon         | Optional; Icon to show                                                                                                                                                                             |
| Type         | Defaults to `button`. Use `submit` to submit a form.                                                                                                                                               |

- Variation; one of [primary](/components/detail/primary-button), [secondary](/components/detail/secondary-button), [simple](/components/detail/simple-button), or [caution](/components/detail/caution-button).
- Text
- Icon
- Type; defaults to `button`. Set to `submit` if used to submit a form.
- Is Loading; defaults to `false`
- Is Disabled; defaults to `false`
- Is Full Width; defaults to `false`,
- Is Large; defaults to `false`

## Uses these components

- [Loader](/components/detail/loader)

## Used in these components

- [Accordion](/components/detail/accordion)
