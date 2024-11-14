// Estado inicial do login, com base no `localStorage`
let isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";

// Lista de funções observadoras para serem notificadas das mudanças
const observers = [];

// Função para registrar um observador
export function registerObserver(callback) {
    observers.push(callback);
}

// Função para notificar todos os observadores
function notifyObservers() {
    observers.forEach(callback => callback(isUserLoggedIn));
}

// Função para atualizar o estado de login
export function setUserLoggedIn(status) {
    isUserLoggedIn = status;
    localStorage.setItem("isUserLoggedIn", status); // Atualiza o `localStorage`
    notifyObservers(); // Notifica os observadores da mudança
}

// Exporta o estado atual do login para outros módulos
export function isLoggedIn() {
    return isUserLoggedIn;
}
