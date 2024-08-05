import { Role } from '@prisma/client'

export default function useRole({
    Role
}: {
    Role: Role
}) {
  if(!Role) return;
  const roles = {
    SalesManager: 'გაყიდვების მენეჯერი',
    Manager: 'საწყობის მენეჯერი',
    Admin: 'ადმინიტრატორი'
  }
  return roles[Role]
}
