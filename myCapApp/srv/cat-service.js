

const cds = require('@sap/cds')
const { Books } = cds.entities('CatalogService')
const logger = cds.log('captraining')
const totalStock = `totalStock`
module.exports = cds.service.impl(async function () {



    const s4 = await cds.connect.to('API_BUSINESS_PARTNER');
    this.on('READ', 'Customer', async req => {
       
        console.log('in the remote')
        return s4.run(req.query);

    });



    const nw = await cds.connect.to('Northwind');
    this.on('READ', 'Customers', async req => {
       
        console.log('in the remote')
        return nw.run(req.query);

    });


    const changeUrgencyDueToSubject = (data) => {
        if (data) {
            const books = Array.isArray(data) ? data : [data];
            books.forEach((book) => {
                if (book.stock <10) {
                    book.urgency = "fast-selling"
                }
            });
        }
    }
    this.on("READ", 'Orders', async (req, next) => {
        if (!req.query.SELECT.columns) return next();
        const expandIndex = req.query.SELECT.columns.findIndex(
            ({ expand, ref }) => expand && ref[0] === "partner"
        );
        if (expandIndex < 0) return next();

        // Remove expand from query
        req.query.SELECT.columns.splice(expandIndex, 1);

        // Make sure supplier_ID will be returned
        if (!req.query.SELECT.columns.indexOf('*') >= 0 &&
            !req.query.SELECT.columns.find(
                column => column.ref && column.ref.find((ref) => ref == "partner_partner"))
        ) {
            req.query.SELECT.columns.push({ ref: ["partner_partner"] });
        }

        const orders = await next();

        const asArray = x => Array.isArray(x) ? x : [ x ];

        // Request all associated suppliers
        const supplierIds = asArray(orders).map(order => order.partner_partner);
        const suppliers = await s4.run(SELECT.from('CatalogService.Customer').where({ partner: supplierIds }));

        // Convert in a map for easier lookup
        const suppliersMap = {};
        for (const supplier of suppliers)
            suppliersMap[supplier.partner] = supplier;

        // Add suppliers to result
        for (const note of asArray(orders)) {
            note.supplier = suppliersMap[note.partner_partner];
        }

        return risks;
    });

    this.on(totalStock, async () => {
        const result = await SELECT.one.from(Books).columns('sum(stock) as total')
        return result.total
    })
    this.after('READ', Books, changeUrgencyDueToSubject)

    //this.on('getStock','Foo', ({params:[id]}) => stocks[id])
    this.on('stockValue', Books, async ({ params: [id] }) => {
        const result = await SELECT
            .one
            .columns(['stock * price as stockValue'])
            .from(Books)
            .where`ID = ${id}`
        return result.stockValue
    })
    this.on('setPrice', Books, async req => {
        const id = req.params[0]
        logger(req.data)
        await UPDATE(Books, id).with({
            price: req.data.price
        })
        return await SELECT(Books, id)
    })
});
    



