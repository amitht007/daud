pipeline {
    agent any

    environment {
     
        // Git config
        GIT_CREDENTIAL_ID = "Devopsgit-ISU-secret-token"
        GIT_URL           = "gitlab.txninfra.com/devops/infra-team/gcp-infra-dev.git"
        GIT_BRANCH        = "stage"
        GIT_USER_EMAIL    = "amit.das@iserveu.co.in"
        GIT_USER_NAME     = "amit_knighty_007"

        // GCP credentials
        GCP_CREDENTIAL_ID = "zod-open-tofu"

        // File names
        ORIGINAL_TFVARS_FILE = "terraform.tfvars"

    }

    stages {

        stage('0. Git Checkout') {
            steps {
                script {
                    try {
                        echo "📥 Starting Git checkout..."
                        cleanWs()
                        
                        git(
                            branch: env.GIT_BRANCH,
                            credentialsId: env.GIT_CREDENTIAL_ID,
                            url: "https://${env.GIT_URL}"
                        )
                        
                        sh "ls -la"
                        echo "✅ Git checkout completed successfully"
                        
                    } catch (Exception e) {
                        error("Git checkout failed: ${e.message}")
                    }
                }
            }
        }

/*
        stage('3. Modify tfvars File') {
            steps {
                script {
                    try {
                        echo "📝 Starting tfvars file modification..."
                        
                        if (!fileExists(env.ORIGINAL_TFVARS_FILE)) {
                            error("Original tfvars file not found: ${env.ORIGINAL_TFVARS_FILE}")
                        }
                        
                        def content = readFile(env.ORIGINAL_TFVARS_FILE)
                        def updatedContent = content.replaceAll('bank', env.VENDOR_NAME)
                            // .replaceAll('{{SUBNET1_RANGE}}', env.SUBNET1_RANGE)
                            // .replaceAll('{{SUBNET2_RANGE}}', env.SUBNET2_RANGE)
                            // .replaceAll('{{SQL_DC_RANGE}}', env.SQL_DC_RANGE)
                            // .replaceAll('{{SQL_DR_RANGE}}', env.SQL_DR_RANGE)
                        
                        writeFile(file: env.NEW_TFVARS_FILENAME, text: updatedContent)
                        
                        sh "ls -la *.tfvars"
                        echo "✅ tfvars file created successfully: ${env.NEW_TFVARS_FILENAME}"
                        
                    } catch (Exception e) {
                        error("tfvars file modification failed: ${e.message}")
                    }
                }
            }
        }

        stage('4. Git Commit & Push') {
            when {
                expression { return env.SKIP_GIT_PUSH != 'true' }
            }
            steps {
                script {
                    try {
                        echo "📤 Starting Git commit and push..."
                        
                        sh '''
                            git config user.email "${GIT_USER_EMAIL}"
                            git config user.name "${GIT_USER_NAME}"
                            git add ${NEW_TFVARS_FILENAME}
                            git status
                        '''
                        
                        def commitStatus = sh(
                            script: "git commit -m 'feat(jenkins): Add config for vendor ${env.VENDOR_NAME}'", 
                            returnStatus: true
                        )
                        
                        if (commitStatus == 0) {
                            withCredentials([gitUsernamePassword(credentialsId: env.GIT_CREDENTIAL_ID)]) {
                                sh "git push origin HEAD:${env.GIT_BRANCH}"
                            }
                            echo "✅ Git push completed successfully"
                        } else {
                            echo "⚠️ No changes to commit"
                        }
                        
                    } catch (Exception e) {
                        error("Git commit & push failed: ${e.message}")
                    }
                }
            }
        }
*/
        stage('1. Tofu Init') {
            steps {
                script {
                    try {
                        echo "🚀 Starting Tofu initialization..."
                        withCredentials([file(credentialsId: env.GCP_CREDENTIAL_ID, variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                                    sh """
                                        cd /var/lib/jenkins/workspace/Devops-Test-parameterized-automation-setup/clients/isu-authentik
                                        tofu init
                                    """      
                                    }
                                    
                        echo "✅ Tofu initialization completed successfully"
                        
                    } catch (Exception e) {
                        error("Tofu initialization failed: ${e.message}")
                    }
                }
            }
        }

        stage('2. Tofu Plan') {
            steps {
                script {
                    try {
                        echo "📋 Starting Tofu plan..."

                        withCredentials([file(credentialsId: env.GCP_CREDENTIAL_ID, variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                                    sh """
                                    cd /var/lib/jenkins/workspace/Devops-Test-parameterized-automation-setup/clients/isu-authentik
                                    tofu plan
                                    """                        }
                                    
                        echo "✅ Tofu plan completed successfully"
                        
                    } catch (Exception e) {
                        error("Tofu plan failed: ${e.message}")
                    }
                }
            }
        }
        /*
        stage('7. Deployment Approval Checkpoint') {
            steps {
                script {
                    try {
                        echo "🛡️ Deployment Approval Checkpoint"
                        def approvalMessage = """
                        ⚠️ INFRASTRUCTURE DEPLOYMENT APPROVAL REQUIRED
                        ===============================================
                        Vendor: ${env.VENDOR_NAME}
                        Project: ${env.PROJECT_ID}
                        
                        Please review the Terraform plan and approve to continue.
                        """
                        echo approvalMessage
                        
                        timeout(time: 10, unit: 'MINUTES') {
                            input(
                                id: 'approval-gate',
                                message: "Approve deployment for vendor: ${env.VENDOR_NAME}?",
                                ok: "Deploy Now"
                            )
                        }
                        echo "✅ Deployment approved!"
                        
                    } catch (Exception e) {
                        error("Approval checkpoint failed: ${e.message}")
                    }
                }
            }
        }
*/

        stage('3. Tofu Apply') {
            steps {
                script {
                    try {
                        echo "🚀 Starting Tofu apply..."

                                withCredentials([file(credentialsId: env.GCP_CREDENTIAL_ID, variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                                    sh """
                                    cd /var/lib/jenkins/workspace/Devops-Test-parameterized-automation-setup/clients/isu-authentik
                                    tofu apply -auto-approve
                                    """
                                } 

                        
                        echo "✅ Tofu apply completed successfully"
                        
                    } catch (Exception e) {
                        error("Tofu apply failed: ${e.message}")
                    }
                }
            }
        }

       stage('4. Tofu Output') {
    steps {
        script {
            try {
                echo "🚀 Generating Tofu output..."

                withCredentials([file(credentialsId: env.GCP_CREDENTIAL_ID, variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh """
                        cd /var/lib/jenkins/workspace/Devops-Test-parameterized-automation-setup/clients/isu-authentik
                        tofu output > tofu-output.log
                        
                        # Copy the output file to Jenkins workspace root for archiving
                        cp tofu-output.log ${WORKSPACE}/tofu-output.log
                        
                        # Also create a timestamped version
                        cp tofu-output.log ${WORKSPACE}/tofu-output-\$(date +%Y%m%d-%H%M%S).log
                    """
                }

                echo "✅ Tofu output generated successfully"

                // Archive the artifact from workspace root
                archiveArtifacts artifacts: 'tofu-output*.log', 
                                fingerprint: true,
                                allowEmptyArchive: true

                // Optional: Display the output in console
                sh "echo '📋 Tofu Output Contents:' && cat ${WORKSPACE}/tofu-output.log"

            } catch (Exception e) {
                error("Tofu Output Failed: ${e.message}")
            }
        }
    }
}


    }

    post {
        always {
            script {
                echo """
                🎯 DEPLOYMENT SUMMARY:
                =====================                
                📊 Pipeline Status: ${currentBuild.currentResult}
                ⏱️ Duration: ${currentBuild.durationString}
                🏗️ Build Number: ${env.BUILD_NUMBER}
                
                """
            }
        }
        success {
            echo "🎉 Pipeline completed successfully!"
        }
        failure {
            echo "💥 Pipeline failed! Check the logs above for details."
        }
        unstable {
            echo "⚠️ Pipeline completed with warnings."
        }
    }
} 
