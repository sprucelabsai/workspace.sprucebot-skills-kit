// @flow
const { eventError } = require('../lib/errorHandler')

import type { IImportFromBigSearchCtx, IImportBigSearchResult } from '../types'

module.exports = async (ctx: IImportFromBigSearchCtx, next: Function) => {
	try {
		console.log('****import-from-big-search', ctx.auth.Organization.name)

		const {
			auth: { Organization: organization, Location: location },
			event: {
				payload: { id, matchId, section, testing }
			}
		} = ctx

		console.log(
			'The section will match what you responded with from the big-search event',
			section,
			testing
		)

		const response: IImportBigSearchResult = {
			successfulImport: undefined,
			matchGroup: undefined
		}

		// Step 1. Load the record from the Id that was clicked
		// for this example, we'll create a dummy one
		let phoneNumber = `5555${id}`
		phoneNumber = `+1 555-555-${phoneNumber.slice(-4)}`

		const selectedRecord = {
			id,
			firstName: `Dummy ${id}`,
			lastName: `User`,
			phoneNumber
		}

		// Step 2. did they pass a matchId? if so, we're just going to update that user
		if (matchId) {
			const updatedUser = await ctx.sb.updateUser(matchId, {
				firstName: selectedRecord.firstName,
				lastName: selectedRecord.lastName
			})

			response.successfulImport = {
				id: updatedUser.id,
				title: `${updatedUser.firstName} ${updatedUser.lastName}`,
				subtitle: 'Go team!',
				image: updatedUser.profileImages
					? updatedUser.profileImages.profile150
					: updatedUser.defaultProfileImages.profile150,
				action: {
					type: 'coreRedirect',
					page: 'profile_user_location',
					routeParams: {
						organizationId: organization.id,
						locationId: location.id,
						userId: updatedUser.id
					}
				}
			}
		} else {
			// Step 2.1. If they did not pass a match id, lets make sure this user doesn't already exist (searching by phone is the most reliable way)
			// you can search by anything you want and read more at https://developer.spruce.ai
			const matches = await ctx.db.models.User.findAll({
				where: {
					phoneNumber: selectedRecord.phoneNumber
				}
			})

			// Step 2.2 - if we did not find a match, lets add them to core
			if (matches.length === 0) {
				try {
					const userLocation = await ctx.sb.createUser({
						firstName: selectedRecord.firstName,
						lastName: selectedRecord.lastName,
						phoneNumber,
						locationId: location.id
					})

					response.successfulImport = {
						id: userLocation.User.id,
						title: `${userLocation.User.firstName} ${
							userLocation.User.lastName
						}`,
						subtitle: 'Go team!',
						action: {
							type: 'coreRedirect',
							page: 'profile_user_location',
							routeParams: {
								organizationId: organization.id,
								locationId: location.id,
								userId: userLocation.User.id
							}
						}
					}
				} catch (err) {
					log.warn('User creation failed')
					throw new Error('UNKNOWN_ERROR')
				}
			} else {
				// Step 2.3 - we found a match, let the user decide if they want to merge
				response.matchGroup = {
					matchGroupTitle: 'Merge user?',
					matchGroupDescription:
						'I think we found a possible match in the system. Check out below!',
					matchingRecordLabel: 'Guest',
					importingRecordLabel: 'Dummy User',
					matches: matches.map(match => ({
						id: match.id,
						title: match.name,
						subtitle: null,
						image: match.profileImages
							? match.profileImages.profile150
							: match.defaultProfileImages.profile150
					}))
				}
			}
		}

		ctx.body = response

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
