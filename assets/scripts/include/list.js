
/**************************************************************************************************************************
 * @class List
 *
 * List
 *
 */


class List {


    constructor() {
        $id("select-list").addEventListener("click", e => {
            e.stopPropagation()
            e.preventDefault()
            this.list_handler()
        })
    }

    list_handler = () => {
        // console.log(post_ids)
        //         http://newmc.test/admin/posts/list/category/cours
        //         var e = document.getElementById("ddlViewBy");
        // var strUser = e.value;
        let query = ''
        let category = $id('category').value
        if (category != 'all') {
            query += '/category/' + category;
        }
        let classe = $id('classe').value
        if (classe != 'all') {
            query += '/classe/' + classe;
        }
        let status = $id('status').value
        if (status != 'all') {
            query += '/status/' + status;
        }
        window.location.href = '/admin/posts/list' + query
    }
}

