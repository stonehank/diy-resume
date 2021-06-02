<template>
    <div class="d-flex resume-diy-home">
        <v-card to="/diy/edit" flat tile class="flex-grow-1 resume-diy-builder"
                dark color="success">
            <div>
                <h1 class="display-1 pl-6">
                    <v-icon color="#fff">fas fa-user-edit</v-icon>
                    TextEdit Mode
                </h1>
                <v-stepper
                        :value="false"
                        style="background:transparent;"
                        flat
                        vertical
                >
                    <v-stepper-step step="1">Type to fill your personal information</v-stepper-step>
                    <v-stepper-content step="1"></v-stepper-content>

                    <v-stepper-step step="2">Choose a template</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>

                    <v-stepper-step step="3" complete>Export, well done!</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>
                </v-stepper>
            </div>
        </v-card>
        <v-card v-if="+$mq>=1260" to="/diy/builder" flat tile class="flex-grow-1 resume-diy-text"
                dark color="info"
        >
            <div>
                <h1 class="display-1 pl-6">
                    <v-icon color="#fff">fas fa-code</v-icon>
                    Builder Mode
                </h1>
                <v-stepper
                        :value="false"
                        style="background:transparent;"
                        flat
                        vertical
                >
                    <v-stepper-step step="1">Drag and Drop to build your resume</v-stepper-step>
                    <v-stepper-content step="1"></v-stepper-content>

                    <v-stepper-step step="2">Type the text, edit the sizing, position, style...</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>

                    <v-stepper-step step="3" complete>Export, well done!</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>
                </v-stepper>
            </div>
        </v-card>
    </div>
</template>

<script>

    export default {
        name: "Home",
    }
</script>

<style scoped>
    .resume-diy-builder{
        display:flex;
        flex-flow:column;
        align-items: center;
        justify-content: center;
    }
    .resume-diy-text{
        display:flex;
        flex-flow:column;
        align-items: center;
        justify-content: center;
    }
</style>
<style lang="scss">
    .resume-diy-home{
        height:100vh;
        .v-stepper__step > .v-stepper__step__step{
            font-size: 16px !important;
            color: #fff !important;
            background: var(--theme-secondary) !important;
            i{
                font-size: 16px !important;
            }
        }
        .v-stepper__step > .v-stepper__label{
            color:#fff !important;
        }
    }

</style>
