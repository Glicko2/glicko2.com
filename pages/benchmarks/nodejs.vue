<template>
<div>
    <section class="section">
        <h2 class="title is-2 has-text-grey">NodeJS Benchmarks</h2>
        <h2 class="title is-5 has-text-grey">Skip to...</h2>
        <ul>
            <li v-for="(key) of orderedKeys" :key="key">
                <a :href="`#${key}`">{{ titles[key] }}</a>
            </li>
        </ul>
        <hr/>
        <h2 class="title is-4 has-text-grey">About</h2>
        <p>
            NodeJS has it's limitations. On top of it being single threaded, it can't really scale well past 1 million players. During testing I, Matthew, got to about 8.6 million, but it got really finicky
            and kept reaching memory limits because all the information is stored locally in memory. This could be solved by utilizing a database, which we do in a way, and chunking the results out. However,
            to make sure every package is on the same playing field we opted against this.
            The 10 million player test just did not finish (DNF) because memory limits.
        </p>
    </section>
    <section>
        <h2 class="title is-3 has-text-grey">Results</h2>
        <div class="columns is-multiline">
            <div class="column is-half" v-for="(key) of orderedKeys" :key="key" :id="key">
                <card :title="titles[key]">
                    <table class="table is-striped is-bordered">
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Period #1</th>
                                <th>Period #2</th>
                                <th>Period #3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(pKey) of Object.keys(benchmarks[key])" :key="pKey">
                                <td><a :href="`https://www.npmjs.com/package/${benchmarks[key][pKey]['package']}/v/${benchmarks[key][pKey]['version']}`" target="_blank">{{ benchmarks[key][pKey]['package'] }}@{{ benchmarks[key][pKey]['version'] }}</a></td>
                                <td v-for="(results, key) of benchmarks[key][pKey]['benchmarks']" :key="key">
                                    <span v-if="results[0] > -1">{{ $prettyTime(results) }}</span>
                                    <span v-else>DNF</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </card>
            </div>
        </div>
    </section>
</div>
</template>


<script>
import Card from '~/components/Card'

export default {
    components: {
        Card,
    },

    data() {
        return {
            orderedKeys: [],
            benchmarks: {},
            sortingOrder: {
                '1kp1km': 1,
                '1kp5km': 2,
                '1mp1mm': 10,
                '10kp1km': 3,
                '10kp10km': 4,
                '10kp20km': 5,
                '10mp10mm': 11,
                '50kp100km': 6,
                '50kp250km': 7,
                '100kp100km': 8,
                '100kp500km': 9,
            },
            titles: {
                '1kp1km': '1k Players, 1k Matches',
                '1kp5km': '1k Players, 5k Matches',
                '1mp1mm': '1m Players, 1m Matches',
                '10kp1km': '10k Players, 1k Matches',
                '10kp10km': '10k Player, 10k Matches',
                '10kp20km': '10k Players, 20k Matches',
                '10mp10mm': '10m Players, 10m Matches',
                '50kp100km': '50k Players, 100k Matches',
                '50kp250km': '50k Players, 250k Matches',
                '100kp100km': '100k Players, 100k Matches',
                '100kp500km': '100k Players, 500k Matches',
            }
        }
    },
    async fetch() {
        this.benchmarks = await fetch('/data/benchmarks/nodejs.json').then(res => res.json());
        this.orderedKeys = Object.keys(this.benchmarks);

        this.orderedKeys.sort((a, b) => {
            if (this.sortingOrder[a] > this.sortingOrder[b]) {
                return 1;
            }

            if (this.sortingOrder[a] < this.sortingOrder[b]) {
                return -1;
            }

            return 0;
        })
    }
}
</script>