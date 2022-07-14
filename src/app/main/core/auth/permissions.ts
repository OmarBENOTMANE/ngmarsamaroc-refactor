export function Permission(permission: string | undefined){

        if(permission) {

            let permissions = JSON.parse(localStorage.getItem("permissions") || '{}')
            return permissions.includes(permission);
        }
        return true;    }


