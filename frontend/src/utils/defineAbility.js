import { AbilityBuilder, PureAbility } from '@casl/ability'

export const ability = new PureAbility()

export function updateAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(PureAbility)

  if (user.role === 'admin') {
    can('manage', 'all')
  } else if (user.role === 'issuing-authority') {
    can('create', 'Document')
    can('read', 'Document')
  } else if (user.role === 'verifying-authority') {
    can('read', 'Document')
    can('verify', 'Document')
  } else {
    can('read', 'Document')
  }

  ability.update(build())
}
