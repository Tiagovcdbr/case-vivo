document.getElementById("userForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Captura os valores do formulário
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const profile = document.getElementById("profile").value;
    const whatsapp = document.getElementById("whatsapp").value.trim();
  
    if (!name || !email || !profile || !whatsapp) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
  
    if (whatsapp.length !== 11 || isNaN(whatsapp)) {
        alert("O número de WhatsApp deve conter exatamente 9 dígitos.");
        return;
    }
  
    // Obtém os usuários do localStorage ou inicializa uma lista vazia
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Adiciona o novo usuário à lista
    users.push({ name, email, profile, whatsapp });
  
    // Salva a lista atualizada no localStorage
    localStorage.setItem("users", JSON.stringify(users));
  
    // Limpa o formulário
    document.getElementById("userForm").reset();
  
    // Exibe mensagem de sucesso
    showSuccessMessage("Usuário cadastrado com sucesso!");
  });
  
  // Função para exibir a mensagem de sucesso
  function showSuccessMessage(message) {
    const modalElement = document.createElement("div");
    modalElement.className = "modal fade";
    modalElement.id = "successModal";
    modalElement.tabIndex = -1;
    modalElement.setAttribute("aria-hidden", "true");
  
    modalElement.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sucesso</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    `;
  
    document.body.appendChild(modalElement);
  
    const successModal = new bootstrap.Modal(modalElement);
    successModal.show();
  
    // Remove o modal do DOM após ele ser fechado
    modalElement.addEventListener("hidden.bs.modal", () => {
        modalElement.remove();
    });
  };
  
  // Restringir entrada no campo de WhatsApp
  const whatsappInput = document.getElementById("whatsapp");
  whatsappInput.addEventListener("input", () => {
    // Remove qualquer caractere não numérico
    whatsappInput.value = whatsappInput.value.replace(/\D/g, "");
  
    // Limita o número de dígitos a 11
    if (whatsappInput.value.length > 11) {
        whatsappInput.value = whatsappInput.value.slice(0, 11);
    }
  });
  