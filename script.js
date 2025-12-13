document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('configForm');
    const wanTypeSelect = document.getElementById('wanType');
    const pppoeFields = document.getElementById('pppoeFields');
    const staticFields = document.getElementById('staticFields');
    const resultBox = document.getElementById('result');
    const configSummary = document.querySelector('.config-summary');
    const printBtn = document.getElementById('printBtn');
    
    // Mostrar/ocultar campos condicionais
    wanTypeSelect.addEventListener('change', function() {
        const type = this.value;
        
        // Esconder todos os campos condicionais
        pppoeFields.style.display = 'none';
        staticFields.style.display = 'none';
        
        // Mostrar apenas os campos relevantes
        if (type === 'PPPoE') {
            pppoeFields.style.display = 'block';
        } else if (type === 'Static') {
            staticFields.style.display = 'block';
        }
    });
    
    // Gerar senha Wi-Fi aleatória (opcional)
    document.getElementById('wifiPassword').addEventListener('focus', function() {
        if (!this.value) {
            const randomPass = generatePassword(12);
            this.value = randomPass;
            alert(`Sugestão de senha gerada: ${randomPass}\nAnote esta senha!`);
        }
    });
    
    // Processar o formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = {
            wifi: {
                ssid: document.getElementById('wifiName').value,
                password: document.getElementById('wifiPassword').value,
                security: document.getElementById('wifiSecurity').value
            },
            wan: {
                type: document.getElementById('wanType').value,
                pppoeUser: document.getElementById('pppoeUser').value,
                pppoePass: document.getElementById('pppoePass').value,
                staticIP: document.getElementById('staticIP').value
            },
            admin: {
                user: document.getElementById('adminUser').value,
                password: document.getElementById('adminPassword').value
            },
            timestamp: new Date().toLocaleString('pt-BR')
        };
        
        // Gerar resumo da configuração
        let summary = `
📡 CONFIGURAÇÃO DO ROTEADOR INTELBRAS WRN 300
═══════════════════════════════════════════════════

🔹 DADOS DA REDE WI-FI
   • Nome da Rede: ${formData.wifi.ssid}
   • Senha: ${formData.wifi.password}
   • Segurança: ${formData.wifi.security}

🔹 CONEXÃO COM A INTERNET
   • Tipo: ${formData.wan.type}`;
        
        if (formData.wan.type === 'PPPoE') {
            summary += `
   • Usuário PPPoE: ${formData.wan.pppoeUser}
   • Senha PPPoE: ${formData.wan.pppoePass}`;
        } else if (formData.wan.type === 'Static') {
            summary += `
   • IP Fixo: ${formData.wan.staticIP}`;
        }
        
        summary += `

🔹 PAINEL DE CONTROLE DO ROTEADOR
   • Acesse: http://192.168.0.1
   • Usuário: ${formData.admin.user}
   • Senha: ${formData.admin.password}

═══════════════════════════════════════════════════
📅 Configurado em: ${formData.timestamp}
⚠️ GUARDE ESTAS INFORMAÇÕES EM LOCAL SEGURO!`;
        
        // Mostrar resultado
        configSummary.textContent = summary;
        resultBox.style.display = 'block';
        
        // Rolar até o resultado
        resultBox.scrollIntoView({ behavior: 'smooth' });
        
        // Opcional: Enviar dados para backend/salvar
        saveConfiguration(formData);
    });
    
    // Botão de imprimir
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Função para gerar senha aleatória
    function generatePassword(length) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    }
    
    // Função para salvar dados (simulação)
    function saveConfiguration(data) {
        // Aqui você enviaria os dados para um servidor
        console.log('Dados para enviar ao servidor:', data);
        
        // Exemplo com Fetch API:
        /*
        fetch('/api/save-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Sucesso:', result);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
        */
        
        // Alternativa: Salvar no localStorage
        const configs = JSON.parse(localStorage.getItem('routerConfigs') || '[]');
        configs.push({
            ...data,
            id: Date.now()
        });
        localStorage.setItem('routerConfigs', JSON.stringify(configs));
    }
});