# Toast

Toast is a floating element that provides a user with feedback on an action they’ve taken. It may include an action, such as ‘Undo’, may be dismissed by a user, and in most cases should disappear on its own.

## Guidelines:

- Use variations as appropriate; the Toast includes a positive and negative variation that should be used for success and failure respectively. If an outcome is neutral, don’t use a variation.
- When to include an ‘Undo’; if the outcome of an action removes something from the interface, the corresponding Toast should include an ‘Undo’ action.
- Timeouts; make sure that the timeout is long enough for text to be read at a deliberate pace.
- Avoid over-stacking; whenever possible, update a Toast’s content rather than stacking duplicate Toasts

## When to use:

Use a Toast when the outcome of an action is not immediately obvious, or if the user may want to undo the action.

## When not to use:

- Don’t be redundant; if the outcome of an action is immediately obvious, Toast doesn’t need to be used
- As a crutch; avoiding using Toast to cover up performance issues.
