var page=0;
module.exports={
    handle:function (io) {
        io.on("connection",function (socket) {
            console.log("io connected");
            socket.on('goPage',function (res) {
                page=res;
                console.log(page)
                io.emit("goPage",page);
            });
            socket.on('disconnect',function (socket) {
                console.log('closed');
            })
        })
    },
    page: function () {
        return page
    }
};