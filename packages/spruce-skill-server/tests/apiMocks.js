module.exports = ctx => ({
	Organization: async (source, args, context, info) => {
		if (args.id) {
			const user = await ctx.db.models.Organization.findOne({
				where: {
					id: args.id
				}
			})
			return user.get()
		}
		return {}
	},
	Location: async (source, args, context, info) => {
		if (args.id) {
			const user = await ctx.db.models.Location.findOne({
				where: {
					id: args.id
				}
			})
			return user.get()
		}
		return {}
	},
	User: async (source, args, context, info) => {
		if (args.id) {
			const user = await ctx.db.models.User.findOne({
				where: {
					id: args.id
				},
				include: [
					ctx.db.models.UserGroup,
					ctx.db.models.UserLocation,
					ctx.db.models.UserOrganization
				]
			})
			return user.get()
		}
		return {}
	}
})
