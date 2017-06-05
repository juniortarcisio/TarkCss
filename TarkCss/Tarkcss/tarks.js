Tarks = function () {
    
    this.MessageBox = function () {

        this.Icons = {
            Success: { Class: "fa-check-circle-o", Color: "#54bb49" },
            Exclamation: { Class: "fa-exclamation-triangle", Color: "#ff0" },
            Failure: { Class: "fa-times-circle-o", Color: "#f00" },
            Bug: { Class: "fa-bug", Color: "#000" }
        };

        this.Show = function (message, title, icon) {
            if (typeof title == "undefined")
                title = "";

            if (typeof message == "undefined")
                message = "";

            /* Header */
            var modalClose = document.createElement("span");
            modalClose.className = "modal-close";
            modalClose.innerHTML = "<i class=\"fa fa-window-close\" aria-hidden=\"true\"></i>";

            var modalTitle = document.createElement("span");
            modalTitle.innerText = title;

            var modalHeader = document.createElement("div");
            modalHeader.className = "modal-header";
            modalHeader.appendChild(modalClose);
            modalHeader.appendChild(modalTitle);

            /* Body */
            var modalMessage = document.createElement("p");
            modalMessage.innerHTML = message;

            var modalIcon = document.createElement("i");
            modalIcon.className = "fa " + icon.Class + " modal-icon";
            modalIcon.style.color = icon.Color;

            var modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.appendChild(modalMessage);
            modalBody.appendChild(modalIcon);

            /* Buttons */
            var button = document.createElement("button");
            button.className = "modal-button";
            button.innerText = "OK";

            var modalFooter = document.createElement("div");
            modalFooter.className = "modal-footer";
            modalFooter.appendChild(button);

            /* Modal base */
            var modalContent = document.createElement("div")
            modalContent.className = "modal-content";
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(modalBody);
            modalContent.appendChild(modalFooter);

            var modal = document.createElement("div");
            modal.className = "modal";
            modal.appendChild(modalContent);
            modal.style.display = "block";
            

            /*trigger events*/
            var closeModalEvent = function () {
                document.body.removeChild(modal);
                window.removeEventListener("click", closeModalEvent)
            };

            modalClose.onclick = closeModalEvent;
            button.onclick = closeModalEvent;
            //window.addEventListener("click", closeModalEvent); - bug

            document.body.appendChild(modal);
            button.focus();
        }

        return this;
    }();

    return this;
}();


//<div id="myModal" class="modal">
//    <div class="modal-content">
//        <div class="modal-header">
//            <span class="close">&times;</span>
//            <h2>Modal Header</h2>
//        </div>
//        <div class="modal-body">
//            <p>Some text in the Modal Body</p>
//            <p>Some other text...</p>
//        </div>
//        <div class="modal-footer">
//            <h3>Modal Footer</h3>
//        </div>
//    </div>
//</div>