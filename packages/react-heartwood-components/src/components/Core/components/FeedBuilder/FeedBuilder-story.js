// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment-timezone'
import FeedBuilder from './FeedBuilder'
import Page, { PageContent } from '../../../Page'
import View from '../../../View/View'
import { Sidebar, SidebarSection } from '../../../Core'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import { messages } from '../../../../../.storybook/data/feed'

import user01image from '../../../../../static/assets/users/user-01--96w.png'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('Feed Builder', module)

stories.addDecorator(ProvideStyles)

stories.add('Basic', () => <FeedBuilder messages={messages} />)
