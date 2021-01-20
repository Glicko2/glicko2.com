<template>
<div>
    <section class="section" v-for="(obj, key) of data['languages']" :key="key">
        <h2 class="title is-3 has-text-grey">{{ obj['title'] }}</h2>

        <div class="columns is-multiline">
            <div class="column is-half" v-for="(lib, key) of data['libraries'][key]" :key="key">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title has-text-grey">
                            {{ lib['display'] }} <span class="tag ml-3">{{ lib['name'] }}</span>
                        </p>
                    </header>
                    <div class="card-content">
                        {{ lib['description'] }}
                        <hr/>
                        <b-tabs type="is-boxed">
                            <b-tab-item v-for="(iObj, key) of obj['install']" :key="key" ckass="" :label="iObj['title']">
                                <code class="pr-6 pl-2 py-3">
                                    {{ iObj['command'].replace('#package#', lib['name']) }}  
                                </code>
                            </b-tab-item>
                        </b-tabs>

                        <hr />
                        <div v-if="lib['benchmarks']['done']" class="notification is-success">
                            {{ lib['name']}} has been benchmarked.
                        </div>
                        <div v-else class="notification is-warning">
                            {{ lib['name'] }} has not been benchmarked.
                            <br/>
                            <i v-if="lib['benchmarks']['note']" >{{ lib['benchmarks']['note'] }}</i>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            <a :href="lib['link']" target="_blank">Library Homepage</a>
                        </p>
                        <p class="card-footer-item">
                            Developed by <a :href="lib['author']['link']" target="_blank" class="ml-1">{{ lib['author']['name'] }}</a>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
    
<script>
export default {

    data() {
        return {
            data: {}
        }
    },

    async fetch() {
        this.data = await fetch('https://glicko2.github.io/libraries/libraries.json').then(res => res.json());
    }
}
</script>