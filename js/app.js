/**
 * Sneha Kumari Professional Portfolio Core JS Engine Architecture
 * Encapsulating structural logic loops, states, persistence, and interface animation pipelines.
 */
(function() {
    'use strict';

    // Application Global Singleton Definition Coordinates
    const PortfolioEngine = {
        // Core Configurations
        CONFIG: {
            authSecretToken: "admin123",
            typewriterPhrases: [
                "Electronics & Communication Engineer",
                "Software Development Enthusiast",
                "Computational Logic & Problem Solver"
            ]
        },

        // Application State Managers
        state: {
            todoItems: [],
            contactMessages: [],
            typephraseIndex: 0,
            typecharIndex: 0,
            isTypeDeleting: false
        },

        // Core Initialization Logic Pipeline
        init: function() {
            this.cacheDOMElements();
            this.bindLifecycleEvents();
            this.initializeTypewriterSequence();
            this.loadCachedStorageMatrices();
            this.registerGlobalNamespace();
        },

        // DOM Elements Cache Mapping Nodes
        cacheDOMElements: function() {
            this.dom = {
                loader: document.getElementById('page-loader'),
                themeBtn: document.getElementById('theme-btn'),
                typewriter: document.getElementById('typewriter-text'),
                revealElements: document.querySelectorAll('.reveal-element'),
                navLinks: document.querySelectorAll('.nav-links a'),
                sections: document.querySelectorAll('section'),
                todoInput: document.getElementById('todo-input'),
                todoAddBtn: document.getElementById('todo-add-action'),
                todoListContainer: document.getElementById('todo-list-target'),
                todoCountPending: document.getElementById('todo-count-pending'),
                todoClearCompleted: document.getElementById('todo-clear-completed'),
                adminPortalBox: document.getElementById('admin-portal-box'),
                adminAuthView: document.getElementById('admin-auth-view'),
                adminDashboardView: document.getElementById('admin-dashboard-view'),
                adminPassField: document.getElementById('admin-pass-input'),
                adminTerminalLog: document.getElementById('admin-terminal-log'),
                contactForm: document.getElementById('contact-form'),
                contactSubmitBtn: document.getElementById('submit-btn'),
                contactSuccessAlert: document.getElementById('form-success')
            };
        },

        // Lifecycle Binding Handlers Mapping
        bindLifecycleEvents: function() {
            // Loader Fade out Sequence handling
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (this.dom.loader) {
                        this.dom.loader.style.opacity = '0';
                        this.dom.loader.style.visibility = 'hidden';
                    }
                    this.executeScrollRevealCheck();
                }, 500);
            });

            // Theme Management binding logic
            if (this.dom.themeBtn) {
                this.dom.themeBtn.addEventListener('click', () => this.toggleInterfaceThemeStyle());
            }

            // Scroll Monitors
            window.addEventListener('scroll', () => {
                this.executeScrollRevealCheck();
                this.syncNavigationScrollSpyState();
            });

            // Smooth Scrolling Capture Logic Nodes
            document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => this.handleSmoothNavigationAnchors(e, anchor));
            });

            // To-Do App bindings
            if (this.dom.todoAddBtn) {
                this.dom.todoAddBtn.addEventListener('click', () => this.executeAddTaskNode());
            }
            if (this.dom.todoInput) {
                this.dom.todoInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.executeAddTaskNode();
                });
            }
            if (this.dom.todoClearCompleted) {
                this.dom.todoClearCompleted.addEventListener('click', () => this.purgeCompletedTasks());
            }
        },

        // Dynamic Typewriter Script Engine Implementation Loop
        initializeTypewriterSequence: function() {
            if (!this.dom.typewriter) return;

            const targetPhrase = this.CONFIG.typewriterPhrases[this.state.typephraseIndex];
            
            if (this.state.isTypeDeleting) {
                this.dom.typewriter.textContent = targetPhrase.substring(0, this.state.typecharIndex - 1);
                this.state.typecharIndex--;
            } else {
                this.dom.typewriter.textContent = targetPhrase.substring(0, this.state.typecharIndex + 1);
                this.state.typecharIndex++;
            }

            let executionSpeed = this.state.isTypeDeleting ? 35 : 80;

            if (!this.state.isTypeDeleting && this.state.typecharIndex === targetPhrase.length) {
                executionSpeed = 2200; // Hold phrase parameters visible 
                this.state.isTypeDeleting = true;
            } else if (this.state.isTypeDeleting && this.state.typecharIndex === 0) {
                this.state.isTypeDeleting = false;
                this.state.typephraseIndex = (this.state.typephraseIndex + 1) % this.CONFIG.typewriterPhrases.length;
                executionSpeed = 400; // Wait delay boundary before starting next phrase
            }

            setTimeout(() => this.initializeTypewriterSequence(), executionSpeed);
        },

        // Hardware Accelerated View Intersection Scroll Reveal Processor
        executeScrollRevealCheck: function() {
            const triggerBoundsOffset = (window.innerHeight / 5) * 4.3;
            
            this.dom.revealElements.forEach(element => {
                const itemTopBounds = element.getBoundingClientRect().top;
                if (itemTopBounds < triggerBoundsOffset) {
                    element.classList.add('active');
                }
            });
        },

        // Synchronous Nav Scrolling Monitoring (Scroll Spy Pipeline)
        syncNavigationScrollSpyState: function() {
            let activeId = '';
            const scrollOffset = window.pageYOffset || document.documentElement.scrollTop;

            this.dom.sections.forEach(section => {
                const top = section.offsetTop - 170;
                if (scrollOffset >= top) {
                    activeId = section.getAttribute('id');
                }
            });

            this.dom.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(activeId) && activeId !== '') {
                    link.classList.add('active');
                }
            });
        },

        // Anchors Transition Vector Processor
        handleSmoothNavigationAnchors: function(event, element) {
            event.preventDefault();
            const hashId = element.getAttribute('href');
            const targetDOMNode = document.querySelector(hashId);
            
            if (targetDOMNode) {
                window.scrollTo({
                    top: targetDOMNode.offsetTop - 75,
                    behavior: 'smooth'
                });
            }
        },

        // Dark/Light State Toggler Node
        toggleInterfaceThemeStyle: function() {
            const rootThemeState = document.documentElement.getAttribute('data-theme');
            if (rootThemeState === 'light') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        },

        // Local Memory Caches Warm Up Pipelines
        loadCachedStorageMatrices: function() {
            // Tasks Loading
            const savedTasksString = localStorage.getItem('sneha_portfolio_todos');
            if (savedTasksString) {
                try {
                    this.state.todoItems = JSON.parse(savedTasksString);
                    this.renderTodoCollectionDOM();
                } catch(err) {
                    this.state.todoItems = [];
                }
            }

            // Messaging Data Loading
            const savedMessagesString = localStorage.getItem('sneha_portfolio_contacts');
            if (savedMessagesString) {
                try {
                    this.state.contactMessages = JSON.parse(savedMessagesString);
                } catch(err) {
                    this.state.contactMessages = [];
                }
            }
        },

        // ToDo Core Logic Block Modules
        executeAddTaskNode: function() {
            if (!this.dom.todoInput) return;
            const textValue = this.dom.todoInput.value.trim();
            
            if (textValue === "") return;

            const todoPacket = {
                id: 'todo_node_' + Date.now(),
                text: textValue,
                completed: false
            };

            this.state.todoItems.push(todoPacket);
            this.dom.todoInput.value = ""; // Clear active input card element text bounds
            
            this.syncTodosToLocalStorage();
            this.appendSingleTaskNodeDOM(todoPacket);
        },

        toggleTaskNodeState: function(id) {
            this.state.todoItems = this.state.todoItems.map(item => {
                if (item.id === id) return { ...item, completed: !item.completed };
                return item;
            });

            this.syncTodosToLocalStorage();
            const element = document.getElementById(id);
            if (element) element.classList.toggle('completed');
        },

        deleteTaskNodeItem: function(event, id) {
            if (event) event.stopPropagation(); // Shield check element tracking triggers
            
            const element = document.getElementById(id);
            if (element) {
                element.style.transform = "scale(0.95) translateX(25px)";
                element.style.opacity = "0";
                
                setTimeout(() => {
                    this.state.todoItems = this.state.todoItems.filter(item => item.id !== id);
                    this.syncTodosToLocalStorage();
                    element.remove();
                }, 220);
            }
        },

        purgeCompletedTasks: function() {
            const finishedNodes = this.state.todoItems.filter(item => item.completed);
            
            finishedNodes.forEach(item => {
                const element = document.getElementById(item.id);
                if (element) {
                    element.style.transform = "scale(0.9) opacity(0)";
                    setTimeout(() => element.remove(), 200);
                }
            });

            this.state.todoItems = this.state.todoItems.filter(item => !item.completed);
            setTimeout(() => this.syncTodosToLocalStorage(), 220);
        },

        syncTodosToLocalStorage: function() {
            localStorage.setItem('sneha_portfolio_todos', JSON.stringify(this.state.todoItems));
            this.updateTodoMetricsDisplay();
        },

        updateTodoMetricsDisplay: function() {
            if (!this.dom.todoCountPending) return;
            const incompleteSize = this.state.todoItems.filter(item => !item.completed).length;
            this.dom.todoCountPending.innerText = `${incompleteSize} task${incompleteSize !== 1 ? 's' : ''} pending`;
        },

        appendSingleTaskNodeDOM: function(item) {
            if (!this.dom.todoListContainer) return;

            const li = document.createElement('li');
            li.className = `todo-item ${item.completed ? 'completed' : ''}`;
            li.id = item.id;
            li.innerHTML = `
                <div class="todo-item-left" onclick="window.portfolio.toggleTodo('${item.id}')">
                    <div class="todo-checkbox"></div>
                    <span class="todo-text">${this.sanitizeHTMLString(item.text)}</span>
                </div>
                <button class="todo-delete-btn" onclick="window.portfolio.removeTodo(event, '${item.id}')">✕</button>
            `;
            this.dom.todoListContainer.appendChild(li);
            this.updateTodoMetricsDisplay();
        },

        renderTodoCollectionDOM: function() {
            if (!this.dom.todoListContainer) return;
            this.dom.todoListContainer.innerHTML = ""; // Empty matching tracking context clean
            this.state.todoItems.forEach(item => this.appendSingleTaskNodeDOM(item));
        },

        // Contact Stream Form Processor Pipeline
        submitContactForm: function(event) {
            event.preventDefault();
            
            const nameVal = document.getElementById('name').value;
            const emailVal = document.getElementById('email').value;
            const msgVal = document.getElementById('message').value;

            this.dom.contactSubmitBtn.innerText = "Transmitting Packet Data...";
            this.dom.contactSubmitBtn.style.opacity = "0.7";
            this.dom.contactSubmitBtn.style.pointerEvents = "none";

            setTimeout(() => {
                const submissionPacket = {
                    timestamp: new Date().toLocaleString(),
                    name: nameVal,
                    email: emailVal,
                    message: msgVal
                };

                this.state.contactMessages.push(submissionPacket);
                localStorage.setItem('sneha_portfolio_contacts', JSON.stringify(this.state.contactMessages));

                this.dom.contactSubmitBtn.innerText = "Transmit Stream";
                this.dom.contactSubmitBtn.style.opacity = "1";
                this.dom.contactSubmitBtn.style.pointerEvents = "all";
                
                this.dom.contactSuccessAlert.style.display = "block";
                this.dom.contactForm.reset();

                // Instantly sync logs if admin view happens to be currently loaded active
                if (this.dom.adminDashboardView.style.display === "block") {
                    this.printDatabaseLogsToTerminal();
                }

                setTimeout(() => {
                    this.dom.contactSuccessAlert.style.display = "none";
                }, 5000);
            }, 900);
        },

        // Cryptographic Console Interface Control Methods Modules
        toggleAdminTerminalVisibility: function() {
            if (!this.dom.adminPortalBox) return;
            const blockState = this.dom.adminPortalBox.style.display;
            this.dom.adminPortalBox.style.display = (blockState === "block") ? "none" : "block";
            if(this.dom.adminPortalBox.style.display === "block") {
                this.dom.adminPortalBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        },

        verifyAdminAuthenticationToken: function() {
            if (this.dom.adminPassField.value === this.CONFIG.authSecretToken) {
                this.dom.adminPassField.value = "";
                this.dom.adminAuthView.style.display = "none";
                this.dom.adminDashboardView.style.display = "block";
                this.printDatabaseLogsToTerminal();
            } else {
                alert("[SECURITY ALERT] Invalid Cryptographic Token Verification Vector Terminated.");
                this.dom.adminPassField.value = "";
            }
        },

        printDatabaseLogsToTerminal: function() {
            if (!this.dom.adminTerminalLog) return;
            
            // Re-read latest cache arrays sync check
            this.loadCachedStorageMatrices();

            if (this.state.contactMessages.length === 0) {
                this.dom.adminTerminalLog.innerText = "System Log: Active tracking queue empty. Awaiting user incoming data streams...";
                return;
            }

            let computedTerminalString = "";
            this.state.contactMessages.forEach((packet, index) => {
                computedTerminalString += `[RECORD ENTRY VECTOR #${index + 1}] Captured: ${packet.timestamp}\n` +
                                          `Identity Node: ${packet.name}\n` +
                                          `Socket Route:  ${packet.email}\n` +
                                          `Payload Data:\n"${packet.message}"\n` +
                                          `----------------------------------------------------------------------\n`;
            });
            this.dom.adminTerminalLog.innerText = computedTerminalString;
        },

        wipeContactMessagesCache: function() {
            if (confirm("System Alert: You are requesting an absolute scrub of the client local message caches. Proceed?")) {
                this.state.contactMessages = [];
                localStorage.setItem('sneha_portfolio_contacts', JSON.stringify(this.state.contactMessages));
                this.printDatabaseLogsToTerminal();
            }
        },

        deauthenticateTerminalSession: function() {
            this.dom.adminDashboardView.style.display = "none";
            this.dom.adminAuthView.style.display = "flex";
            this.toggleAdminTerminalVisibility();
        },

        // Utility Methods
        sanitizeHTMLString: function(text) {
            const escapePatterns = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
            return text.replace(/[&<>"']/g, (m) => escapePatterns[m]);
        },

        // Exposing specific safe handles to the global scope namespace context
        registerGlobalNamespace: function() {
            window.portfolio = {
                toggleAdminPortal: () => this.toggleAdminTerminalVisibility(),
                validateAdminLogin: () => this.verifyAdminAuthenticationToken(),
                clearMessageStore: () => this.wipeContactMessagesCache(),
                lockTerminal: () => this.deauthenticateTerminalSession(),
                toggleTodo: (id) => this.toggleTaskNodeState(id),
                removeTodo: (e, id) => this.deleteTaskNodeItem(e, id),
                submitContactForm: (e) => this.submitContactForm(e)
            };
        }
    };

    // Ignite the core architecture engine framework instantly on script file evaluation
    PortfolioEngine.init();
})();
