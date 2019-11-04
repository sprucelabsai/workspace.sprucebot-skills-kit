// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import { generateLocations } from '../../../.storybook/data/tableData'
import { Formik } from 'formik'
import Table, { TableSearch, TableFilters } from './index'
import Layout, { LayoutSection } from '../Layout'
import Card, { CardHeader, CardBody } from '../Card'
import Button from '../Button/Button'
import Tabs from '../Tabs/Tabs'
import {
	TextInput,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem
} from '../Forms'

const stories = storiesOf('Table', module)

stories.addDecorator(withKnobs)

const staticLocations = generateLocations({ amount: 149 })

const columns = [
	{
		Header: 'Public Name',
		accessor: 'publicName',
		// NOTE: It looks like with has to be passed here to override built-in inline styles
		minWidth: 300,
		maxWidth: 400,
		Cell: function PublicNameCell(row) {
			return <a href="#">{row.value}</a>
		}
	},
	{
		Header: 'Store',
		accessor: 'storeNumber',
		minWidth: 80,
		maxWidth: 100
	},
	{
		Header: 'Status',
		accessor: 'status',
		minWidth: 80,
		maxWidth: 100
	},
	{
		Header: 'Address',
		accessor: 'address',
		minWidth: 420,
		maxWidth: 500
	}
]

type State = {
	locations: Array<Object>
}

type Props = {}

class ExpandableEditableTable extends React.Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			locations: generateLocations({ amount: 149 })
		}
	}

	handleChangeHours = (e, location, dayId) => {
		const { locations } = this.state

		locations.forEach(l => {
			if (l.id === location.id) {
				const updatedSchedule = l.schedule.map(day => {
					const updatedDay = day
					if (day.id === dayId) {
						l.isDirty = true
						updatedDay.hours = e.target.value
						updatedDay.isDirty = true
					}
					return updatedDay
				})

				l.schedule = updatedSchedule
			}
		})

		this.setState({ locations })
	}

	handleValidation = async (location: Object, dayId) => {
		let errors = {}

		const { locations } = this.state

		const updatedLocation = locations.find(l => l.id === location.id)
		const updatedScheduleDay =
			updatedLocation && updatedLocation.schedule.find(day => day.id === dayId)

		if (updatedLocation && updatedScheduleDay && !updatedScheduleDay.isDirty) {
			updatedLocation.isDirty = true
			updatedScheduleDay.isDirty = true
			this.setState({ locations })
		}

		return errors
	}

	handleSaveHours = async (location: Object, dayId, values) => {
		const { locations } = this.state

		const updatedLocation = locations.find(l => l.id === location.id)
		const updatedScheduleDay =
			updatedLocation && updatedLocation.schedule.find(day => day.id === dayId)

		if (updatedLocation && updatedScheduleDay) {
			updatedScheduleDay.hours = values.hours || ''
			updatedLocation.isDirty = false
			updatedScheduleDay.isDirty = false
			this.setState({ locations })
		}
	}

	renderStoreScheduleForRow = (row: Object) => {
		const location = this.state.locations[row.index]
		const schedule = location && location.schedule
		return schedule ? (
			<Fragment>
				<CardHeader title={'Store Schedule'} />
				<Table
					isSelectable
					className="store-schedule-table"
					data={schedule}
					columns={[
						{
							Header: 'Day',
							accessor: 'day',
							minWidth: 100,
							maxWidth: 300
						},
						{
							Header: 'Hours',
							accessor: 'hours',
							minWidth: 100,
							maxWidth: 500
						}
					]}
					collapseOnDataChange={false}
					loading={false}
					pageSize={schedule.length}
					showPagination={false}
					subComponentForRow={row => {
						return (
							<CardBody>
								<Formik
									initialValues={row.original}
									validate={values =>
										this.handleValidation(location, row.original.id, values)
									}
									render={(formikProps: Object) => {
										const { handleChange, values } = formikProps

										return (
											<form onSubmit={formikProps.handleSubmit}>
												<FormLayout>
													<FormLayoutGroup>
														<FormLayoutItem>
															<TextInput
																label={`${row.original.day} Store Hours`}
																onChange={handleChange}
																name="hours"
																value={values.hours || ''}
															/>
														</FormLayoutItem>
														<FormLayoutItem spacerTop={true}>
															<Button
																kind="primary"
																onClick={() =>
																	this.handleSaveHours(
																		location,
																		row.original.id,
																		values
																	)
																}
																disabled={!row.original.isDirty}
																text="Save"
															/>
														</FormLayoutItem>
													</FormLayoutGroup>
												</FormLayout>
											</form>
										)
									}}
								/>
							</CardBody>
						)
					}}
					rowIsDirty={row => {
						return row.original.isDirty
					}}
					keyField="id"
				/>
			</Fragment>
		) : null
	}

	render() {
		const { locations } = this.state

		return (
			<Table
				className="store-locations-table"
				data={locations}
				columns={columns}
				sortable={true}
				defaultPageSize={50}
				defaultSorted={[
					{
						id: 'publicName',
						desc: false
					}
				]}
				loading={false}
				collapseOnDataChange={false}
				paginationProps={{
					showPages: true,
					onPageButtonClick: () => console.log('onPageButtonClick'),
					totalPages: Math.ceil(locations.length / 50),
					currentPage: 0
				}}
				rowIsDirty={row => {
					return row.original.isDirty
				}}
				subComponentForRow={this.renderStoreScheduleForRow}
				keyField="id"
			/>
		)
	}
}

stories
	.add('Table', () => {
		return (
			<Layout width="full-width">
				<LayoutSection>
					<Card>
						{boolean('Show Title', false) && (
							<CardHeader title={text('Title', 'Locations')} />
						)}
						{boolean('Show Tabs', false) && (
							<Tabs
								tabs={[
									{ text: 'All locations', isCurrent: true },
									{ text: 'Midwest' },
									{ text: 'Northeast' }
								]}
								isPadded
							/>
						)}
						<TableSearch placeholder="Search locations…" />
						{boolean('Is Filtered', false) && (
							<TableFilters
								filters={[
									{ text: 'State: IL' },
									{ text: 'Status: Published' },
									{ text: 'City: Bolingbrook' },
									{ text: 'City: Chicago' },
									{
										text: 'Chimera Hair Salon'
									}
								]}
							/>
						)}
						<Table
							className="services-table"
							data={staticLocations}
							columns={columns}
							sortable={true}
							defaultPageSize={50}
							defaultSorted={[
								{
									id: 'publicName',
									desc: false
								}
							]}
							loading={false}
							paginationProps={{
								showPages: true,
								onPageButtonClick: () => console.log('onPageButtonClick'),
								totalPages: Math.ceil(staticLocations.length / 50),
								currentPage: 0
							}}
							keyField="id"
						/>
					</Card>
				</LayoutSection>
			</Layout>
		)
	})
	.add('Expandable Table', () => {
		return (
			<Layout width="full-width">
				<LayoutSection>
					<Card>
						<ExpandableEditableTable />
					</Card>
				</LayoutSection>
			</Layout>
		)
	})
	.add('Selectable Table', () => (
		<Layout width="full-width">
			<LayoutSection>
				<Card>
					{boolean('Show Title', false) && (
						<CardHeader title={text('Title', 'Locations')} />
					)}
					{boolean('Show Tabs', false) && (
						<Tabs
							tabs={[
								{ text: 'All locations', isCurrent: true },
								{ text: 'Midwest' },
								{ text: 'Northeast' }
							]}
							isPadded
						/>
					)}
					<TableSearch placeholder="Search locations…" />
					{boolean('Is Filtered', false) && (
						<TableFilters
							filters={[
								{ text: 'State: IL' },
								{ text: 'Status: Published' },
								{ text: 'City: Bolingbrook' },
								{ text: 'City: Chicago' },
								{
									text: 'Chimera Hair Salon'
								}
							]}
						/>
					)}
					<Table
						className="services-table-selectable"
						data={staticLocations}
						columns={columns}
						sortable={true}
						defaultPageSize={50}
						defaultSorted={[
							{
								id: 'publicName',
								desc: false
							}
						]}
						loading={false}
						paginationProps={{
							showPages: true,
							onPageButtonClick: () => console.log('onPageButtonClick'),
							totalPages: Math.ceil(staticLocations.length / 50),
							currentPage: 0
						}}
						isSelectable
						kind="location"
						selectType="checkbox"
						bulkActions={[
							{
								text: 'Add to location group',
								onClick: () => console.log('Click')
							},
							{
								text: 'Make locations live',
								onClick: () => console.log('Click')
							},
							{
								text: 'Hide locations',
								onClick: () => console.log('Click')
							},
							{
								text: 'Delete locations',
								onClick: () => console.log('Click')
							}
						]}
						keyField="id"
					/>
				</Card>
			</LayoutSection>
		</Layout>
	))
