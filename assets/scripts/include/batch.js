
/**************************************************************************************************************************
 * @class Batch
 *
 * Batch
 *
 */


class Batch {


    constructor() {
        this.i_post = 0;
        $id("batch").addEventListener("click", e => {
            e.stopPropagation()
            e.preventDefault()
            this.batch_handler()
        })
    }

    batch_handler = () => {
        // console.log(post_ids)
        let post_keys = JSON.parse(post_ids);
        //  console.log(post_keys)
        fetch("/ajax/get-post/" + post_keys[this.i_post]['id'], {
            method: 'get'
        }).then(res => {
            return res.text().then(text => {
                console.log(text)
                this.i_post += 1
            })
        })
    }
}

